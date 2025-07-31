class UserService {
  constructor() {
    this.storageKey = 'users';
  }

  getAllUsers() {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  getUserById(id) {
    const users = this.getAllUsers();
    return users.find(user => user.id === id);
  }

  createUser(data) {
    const users = this.getAllUsers();
    const newUser = {
      ...data,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      last_login: '',
      deleted_at: ''
    };
    users.push(newUser);
    localStorage.setItem(this.storageKey, JSON.stringify(users));
    return newUser;
  }

  updateUser(id, updatedData) {
    const users = this.getAllUsers();
    const idx = users.findIndex(user => user.id === id);
    if (idx === -1) return null;
    users[idx] = {
      ...users[idx],
      ...updatedData,
      updated_at: new Date().toISOString()
    };
    localStorage.setItem(this.storageKey, JSON.stringify(users));
    return users[idx];
  }

  deleteUser(id) {
    const users = this.getAllUsers();
    const updated = users.filter(user => user.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(updated));
    return updated;
  }
}

export default new UserService();
