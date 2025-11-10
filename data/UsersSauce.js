// ✅ No Playwright imports here

class UsersSauce {
  constructor() {
    this.password = 'secret_sauce';

    // 🟩 Accepted users (valid login)
    this.acceptedUsers = [
      { username: 'standard_user', password: this.password },
      { username: 'problem_user', password: this.password },
      { username: 'performance_glitch_user', password: this.password },
      { username: 'error_user', password: this.password },
      { username: 'visual_user', password: this.password }
    ];

    // 🟥 Locked-out user (special)
    this.lockedOutUser = { username: 'locked_out_user', password: this.password };

    // 🧩 Derived values
    this.validUsernames = this.acceptedUsers.map(u => u.username);
    this.validUsernames.push(this.lockedOutUser.username);

    // 🧩 Common test data
    this.emptyPassword = '';
    this.emptyUsername = '';
    this.wrongUsername = 'wrong_sauce_user';
    this.wrongPassword = 'wrong_sauce_password';

    // ⚙️ Error / invalid login combinations
    this.errorUsers = [
      // 🔴 Locked-out user first (special case)
      this.lockedOutUser,

      // 🟧 Valid username + wrong password
      ...this.validUsernames.map(u => ({ username: u, password: this.wrongPassword })),

      // 🟨 Wrong username + correct password
      { username: this.wrongUsername, password: this.password },

      // 🟦 Wrong username + wrong password
      { username: this.wrongUsername, password: this.wrongPassword },

      // 🟪 Valid username + empty password
      ...this.validUsernames.map(u => ({ username: u, password: this.emptyPassword })),

      // 🟫 Empty username + valid password
      { username: this.emptyUsername, password: this.password },

      // ⬛ Both fields empty
      { username: this.emptyUsername, password: this.emptyPassword }
    ];
  }
}

// ✅ Export instance
export const usersSauce = new UsersSauce();
