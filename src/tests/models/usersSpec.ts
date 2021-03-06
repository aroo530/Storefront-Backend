import { User, UserOperations } from '../../models/users';
const operations: UserOperations = new UserOperations();

describe('UserOperations', () => {
    const tempUser: User = {
        first_name: 'LOL',
        last_name: 'XD',
        password: 'USERoperations',
    };
    const updateUser: User = {
        first_name: 'LOL',
        last_name: 'XD',
        password: '12345',
    };

    it('should create a new user', async () => {
        const newUser: User = await operations.createUser(tempUser);
        expect(newUser.first_name).toEqual(tempUser.first_name);
    });

    it('should get user', async () => {
        const user: User = await operations.getUser('LOL');
        expect(user.first_name).toEqual('LOL');
        expect(user.last_name).toEqual('XD');
    });

    it('should get all users', async () => {
        expect((await operations.getUsers()).length).toEqual(2);
    });

    it('should update user', async () => {
        const user = await operations.updateUser(
            updateUser.password,
            tempUser.first_name
        );
        expect(
            user.first_name === updateUser.first_name &&
                user.last_name === updateUser.last_name &&
                user.password === updateUser.password
        ).toBeTruthy();
    });

    it('should delete user', async () => {
        const user = await operations.deleteUser('LOL');
        expect(
            user.first_name === updateUser.first_name &&
                user.last_name === updateUser.last_name &&
                user.password === updateUser.password
        ).toBeTruthy();
    });
});
