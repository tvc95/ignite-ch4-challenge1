import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe("Create User", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to create a new user", async () => {
    const user = await createUserUseCase.execute({
      email: "user@platform.com",
      name: "User",
      password: "myPassword123"
    });

    expect(user).toHaveProperty("id");
  });

  it("should not be able to create an user with an already registered e-mail", () => {
    expect(async () => {
      await createUserUseCase.execute({
        email: "user@platform.com",
        name: "User",
        password: "myPassword123"
      });

      await createUserUseCase.execute({
        email: "user@platform.com",
        name: "Antonio",
        password: "124584sad"
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
