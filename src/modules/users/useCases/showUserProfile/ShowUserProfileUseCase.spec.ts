import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

let showUserProfileUseCase: ShowUserProfileUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;


describe("Show User Profile", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    showUserProfileUseCase = new ShowUserProfileUseCase(inMemoryUsersRepository);
  });

  it("should be able to show user profile", async () => {
    const user = await inMemoryUsersRepository.create({
      email: "user@platform.com",
      name: "Joshua Lando",
      password: "josh123@nice"
    });

    if (user.id) {
      const find = await showUserProfileUseCase.execute(user.id);

      expect(find).toEqual(user);
    }
  });

  it("should not show a non-existant profile", async () => {
    expect(async () => {
      await inMemoryUsersRepository.create({
        email: "user@platform.com",
        name: "Joshua Lando",
        password: "josh123@nice"
      });

      await showUserProfileUseCase.execute("154831asda848");
    }).rejects.toBeInstanceOf(AppError);
  });
})
