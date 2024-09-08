# Clone Me - VS Code Extension

## Overview

"Clone Me" is a Visual Studio Code extension designed to simplify the process of following and sharing code in educational settings. It allows instructors to easily share their code with students, and enables students to follow along with coursework by cloning and updating repositories efficiently within VS Code.

## Features

- **Follow**: Clone an instructor's repository as a submodule
- **Refresh**: Update all followed repositories to their latest versions
- **Unfollow**: Remove a previously followed repository

## Installation

1. Open Visual Studio Code
2. Go to the Extensions view (Ctrl+Shift+X)
3. Search for "Clone Me"
4. Click Install

## Usage

### Follow an Instructor
1. Open the Command Palette (Ctrl+Shift+P)
2. Run "Clone: Follow"
3. Enter the instructor's GitHub username when prompted
4. The instructor's repository will be cloned into `.clone-me/{username}-clone/me`

### Refresh Followed Repositories
1. Open the Command Palette (Ctrl+Shift+P)
2. Run "Clone: Refresh"
3. All followed repositories will be updated to their latest versions

### Unfollow an Instructor
1. Open the Command Palette (Ctrl+Shift+P)
2. Run "Clone: Unfollow"
3. Enter the instructor's GitHub username when prompted
4. The corresponding repository will be removed

## How It Works

- The extension uses Git submodules to manage followed repositories
- When following an instructor, only the `me` folder from their repository is kept
- Other files and folders in the cloned repository are automatically removed

## Requirements

- Visual Studio Code v1.60.0 or higher
- Git installed and configured on your system

## Extension Settings

This extension doesn't add any VS Code settings.

## Known Issues

Please report any issues on the [GitHub repository](https://github.com/pahventure/clone-me/issues).

## Release Notes

### 0.0.1

Initial release of Clone Me

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).

## More Information

For more information about the project and its educational use cases, visit [https://pahventure.github.io/clone-me/](https://pahventure.github.io/clone-me/).

## About the Author

This extension was created by Pah Venture as part of an educational initiative to improve code sharing and collaboration in programming courses.