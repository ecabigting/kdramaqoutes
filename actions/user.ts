// actions/user.ts
"use server";
import bcrypt from 'bcrypt';
import { auth } from "@/auth";
import { checkDisplayNameExists, checkEmailExists, createNewUser, findUserByEmail, getDisplayName, getUserById, setDisplayNameDismissed, updateUserDisplayName } from "../data/user";
import { signupFormSchema } from "@/types/schema/signupFormSchema";

export const createUser = async (data: {
  displayName: string;
  email: string;
  password: string;
}) => {
  try {
    // Validate input
    const validatedData = signupFormSchema.parse(data);

    // Check if email already exists
    const emailExists = await checkEmailExists(validatedData.email);
    if (emailExists) {
      return { error: 'Email already in use' };
    }

    // Check if displayName already exists
    const displayNameExists = await checkDisplayNameExists(validatedData.displayName);
    if (displayNameExists) {
      return { error: 'Display name already taken' };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    validatedData.password = hashedPassword;

    // Create user
    const user = await createNewUser(validatedData);
    return { success: true, userId: user.id };
  } catch (error) {
    console.error('Registration error:', error);
    return { error: 'Failed to create user' };
  }
};


export const getCurrentUser = async () => {
  const session = await auth();
  if (!session?.user?.id) return null;

  const user = await getUserById(session.user.id);
  return {
    ...user,
    displayName: user?.displayName || user?.name?.split(' ')[0] || 'Anonymous'
  };
};

export const updateCurrentUserDisplayName = async (formData: FormData) => {
  try {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");

    const displayName = formData.get("displayName") as string;

    // Check availability
    const isAvailable = await checkDisplayNameAvailable(displayName, session.user.id);
    if (!isAvailable) throw new Error(`"${displayName}" is already taken`);

    // Update in database
    await updateUserDisplayName(session.user.id, displayName);

    return { success: true };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to update display name"
    };
  }
};

export const dismissDisplayNamePrompt = async () => {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  session.user.displayNameChanged = true;
  return await setDisplayNameDismissed(session.user.id);
};

export const checkDisplayNameAvailable = async (displayName: string, currentUserId: string) => {
  return await getDisplayName(displayName, currentUserId);
}

export const verifyCredentials = async (email: string, password: string) => {
  try {
    // 1. Find user
    const user = await findUserByEmail(email);
    if (!user) {
      return { error: 'Invalid email or password' };
    }

    // 2. Check account status
    if (user.isEnabled === false) {
      return { error: 'Account disabled. Contact support' };
    }

    // 3. Verify password
    const validPassword = await bcrypt.compare(password, user.password!);
    if (!validPassword) {
      return { error: 'Invalid email or password' };
    }

    // 4. Return success with sanitized user data
    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        displayName: user.displayName,
        displayNameChanged: user.displayNameChanged,
        image: user.image
      }
    };

  } catch (error) {
    console.error('Authentication error:', error);
    return { error: 'Authentication failed. Please try again' };
  }
};
