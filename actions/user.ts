// ./actions/user.ts
"use server";
import bcrypt from 'bcrypt';
import { auth } from "@/auth";
import { checkDisplayNameExists, checkEmailExists, createNewUser, createVerificationToken, findUserByEmail, getDisplayName, getUserById, getVerificationToken, setDisplayNameDismissed, updateUserDisplayName, verifyUserByToken } from "../data/user";
import { signupFormSchema } from "@/types/schema/signupFormSchema";
import { sendUserVerificationEmail } from '../lib/emailer';
import { ActionResult } from '@/types/actionResult';

export const createUser = async (data: {
  displayName: string;
  email: string;
  password: string;
}): Promise<ActionResult<unknown>> => {
  try {
    // Validate input
    const validatedData = signupFormSchema.parse(data);

    // Check if email already exists
    const emailExists = await checkEmailExists(validatedData.email);
    if (emailExists) {
      return { success: false, message: 'Email already in use', data: null };
    }

    // Check if displayName already exists
    const displayNameExists = await checkDisplayNameExists(validatedData.displayName);
    if (displayNameExists) {
      return { success: false, message: 'Display name already taken', data: null };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    validatedData.password = hashedPassword;

    // Create user
    const user = await createNewUser(validatedData);

    // Create Token
    const token = await createVerificationToken(user.email);

    // Send verification token
    const emailResult = await sendUserVerificationEmail(user.email, user.displayName as string, token)
    if (!emailResult) {
      return { success: false, message: "Failed sending email verification. Please contact support!", data: null }
    }

    return { success: true, data: { userID: user.id }, message: "" };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, data: null, message: 'Failed to create user' };
  }
};

export const getCurrentUser = async (): Promise<ActionResult<UserProfile>> => {
  const session = await auth();
  if (!session?.user?.id) return { success: false, message: "", data: undefined };

  const user = await getUserById(session.user.id);
  return {
    success: true,
    message: "",
    data: {
      ...user,
      displayName: user?.displayName || user?.name?.split(' ')[0] || 'Anonymous'
    } as UserProfile
  };
};

export const updateCurrentUserDisplayName = async (formData: FormData): Promise<ActionResult<unknown | null>> => {
  try {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");

    const displayName = formData.get("displayName") as string;

    // Check availability
    const isAvailable = await getDisplayName(displayName, session.user.id);
    if (!isAvailable) throw new Error(`"${displayName}" is already taken`);

    // Update in database
    await updateUserDisplayName(session.user.id, displayName);

    return { success: true, message: "", data: null };
  } catch (error) {
    console.log(error)
    return {
      success: false, message: `Failed to update display name! ${error}`, data: null
    };
  }
};

export const dismissDisplayNamePrompt = async (): Promise<ActionResult<unknown>> => {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  session.user.displayNameChanged = true;
  return { success: true, message: "", data: await setDisplayNameDismissed(session.user.id) };
};

// export const checkDisplayNameAvailable = async (displayName: string, currentUserId: string): Promise<ActionResult<unknown>> => {
//   return { success: false, message: "", data: await getDisplayName(displayName, currentUserId) };
// }

export const verifyCredentials = async (email: string, password: string): Promise<ActionResult<unknown>> => {
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return { success: false, message: 'Invalid email or password', data: null };
    }

    if (user.isEnabled === false) {
      return { success: false, message: 'Account disabled. Contact support', data: null };
    }

    const validPassword = await bcrypt.compare(password, user.password!);
    if (!validPassword) {
      return { success: false, message: 'Invalid email or password', data: null };
    }

    if (!user.emailVerified) {
      const emailResult = await resendVerificationEmail(email);
      console.log(emailResult)
      return { success: false, message: "SENT_VERTIFICATION", data: null }
    }
    return {
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          displayName: user.displayName,
          displayNameChanged: user.displayNameChanged,
          image: user.image,
          emailVerified: user.emailVerified
        }
      }, message: ""
    };

  } catch (error) {
    console.error('Authentication error:', error);
    return { success: false, data: null, message: "Authentication failed. Please try again" };
  }
};

export const verifyUserEmail = async (token: string): Promise<{ success: boolean; error?: string }> => {
  try {

    const verification = await getVerificationToken(token)
    if (!verification) {
      return { success: false, error: "Invalid Verification Link!" }
    }

    if (await isVerificationCodeExpired(verification.expires)) {
      const user = await findUserByEmail(verification.identifier)
      const token = await createVerificationToken(verification.identifier);
      if (!user) return { success: false, error: "Failed verifying your email! Please contact support!" }
      // Send verification token
      const emailResult = await sendUserVerificationEmail(user.email, user.displayName ?? '', token)
      if (!emailResult) {
        return { success: false, error: "Failed sending email verification. Please contact support!" }
      }
      return { success: false, error: "EXPIRED_TOKEN" }
    }

    await verifyUserByToken(verification.identifier);
    return { success: true, error: "" }
  } catch (err) {
    console.log(err)
    return { success: false, error: "Unable to verify your email!" }
  }
}

export const resendVerificationEmail = async (email: string) => {
  const userTempDisplayName = email.split('@')[0]
  const token = await createVerificationToken(email)
  const emailResult = await sendUserVerificationEmail(email, userTempDisplayName, token)
  return emailResult;
}

export const isVerificationCodeExpired = async (expires: Date) => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const expirationDate = isDevelopment ? new Date(expires) : expires;
  return new Date() > expirationDate;
}
