import { userRepository } from "../repositories/user.repository";
import { hashPassword, verifyPassword } from "../utils/password";
import { signJwt } from "../utils/jwt";
import { Conflict, Unauthorized, NotFound } from "../utils/errors";
import type { RegisterInput, LoginInput, UpdateProfileInput } from "../validators/auth.validator";

const toPublicUser = (u: {
  id: string;
  email: string;
  username: string;
  displayName: string | null;
  avatarUrl: string | null;
  bio: string | null;
  createdAt: Date;
}) => ({
  id: u.id,
  email: u.email,
  username: u.username,
  displayName: u.displayName,
  avatarUrl: u.avatarUrl,
  bio: u.bio,
  createdAt: u.createdAt,
});

export const authService = {
  async register(input: RegisterInput) {
    const [byEmail, byUsername] = await Promise.all([
      userRepository.findByEmail(input.email),
      userRepository.findByUsername(input.username),
    ]);
    if (byEmail) throw Conflict("Email is already in use");
    if (byUsername) throw Conflict("Username is already taken");

    const passwordHash = await hashPassword(input.password);
    const user = await userRepository.create({
      email: input.email,
      username: input.username,
      passwordHash,
      displayName: input.username,
    });

    const token = signJwt({
      userId: user.id,
      email: user.email,
      username: user.username,
    });

    return { user: toPublicUser(user), token };
  },

  async login(input: LoginInput) {
    let user = await userRepository.findByEmail(input.email);
    if (!user) user = await userRepository.findByUsername(input.email);
    if (!user) throw Unauthorized("Invalid email or password");

    const ok = await verifyPassword(input.password, user.passwordHash);
    if (!ok) throw Unauthorized("Invalid email or password");

    const token = signJwt({
      userId: user.id,
      email: user.email,
      username: user.username,
    });

    return { user: toPublicUser(user), token };
  },

  async me(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user) throw NotFound("User not found");
    return toPublicUser(user);
  },

  async updateProfile(userId: string, input: UpdateProfileInput) {
    const user = await userRepository.update(userId, input);
    return toPublicUser(user);
  },

  async stats(userId: string) {
    return userRepository.stats(userId);
  },
};
