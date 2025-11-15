import { db } from "@/core/singleton";
import { NewUser, users } from "@/db/schemas";
import { eq } from "drizzle-orm";
import { User } from "../auth/user";

/** An abstract class to represent all user interactions in the database */
export class DatabaseUserInteractions {
  // START: CREATE

  /** Used to create a user */
  async createUser(config: NewUser): Promise<User> {
    return await db.insert(users).values(config).returning();
  }

  // END: CREATE

  // START: READ

  /** Used to retrieve a single user via their id */
  async getUserById(id: string): Promise<User | null> {
    return await db.select().from("users").where(eq(users.id, id)).findFirst();
  }

  /** Used to retrieve a user via their email */
  async getUserByEmail(email: string): Promise<User | null> {
    return await db
      .select()
      .from("users")
      .where(eq(users.email, email))
      .findFirst();
  }

  /** Used to retrieve a user via their username */
  getUserByUsername(username: string): Promise<User | null> {
    return db
      .select()
      .from("users")
      .where(eq(users.username, username))
      .findFirst();
  }

  // END: READ

  // START: UPDATE

  /** Used to update a user's email via their id */
  async updateUserEmail(email: string, id: string): Promise<User | null> {
    const result = await db
      .update(users)
      .set({ email })
      .where(eq(users.id, id))
      .returning();

    return result[0] || null;
  }

  /** Used to update a user's name via their id */
  async updateUserName(name: string, id: string): Promise<User | null> {
    const result = await db
      .update(users)
      .set({ name })
      .where(eq(users.id, id))
      .returning();

    return result[0] || null;
  }

  /** Used to update a user's username via their id */
  async updateUserUsername(username: string, id: string): Promise<User | null> {
    const result = await db
      .update(users)
      .set({ username })
      .where(eq(users.id, id))
      .returning();

    return result[0] || null;
  }

  /** Used to update a user's password via their id */
  async updateUserPassword(password: string, id: string): Promise<User | null> {
    const result = await db
      .update(users)
      .set({ password })
      .where(eq(users.id, id))
      .returning();

    return result[0] || null;
  }

  /** Used to update a user's password hash via their id */
  async updateUserPasswordHash(
    passwordHash: string,
    id: string
  ): Promise<User | null> {
    const result = await db
      .update(users)
      .set({ passwordHash })
      .where(eq(users.id, id))
      .returning();

    return result[0] || null;
  }

  /** Used to update a user's image via their id */
  async updateUserImage(image: string, id: string): Promise<User | null> {
    const result = await db
      .update(users)
      .set({ image })
      .where(eq(users.id, id))
      .returning();

    return result[0] || null;
  }

  // END: UPDATE

  // START: DELETE

  /** Used to delete a user via their username*/
  async deleteUser(id: string): Promise<User | null> {
    const result = await db.delete(users).where(eq(users.id, id)).returning();

    return result[0] || null;
  }

  // END: DELETE
}
