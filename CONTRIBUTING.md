# Contributing to ConvertKSH

Thank you for considering contributing to ConvertKSH! We appreciate your interest in making our financial tools better for everyone in Kenya.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Your First Code Contribution](#your-first-code-contribution)
  - [Pull Requests](#pull-requests)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Message Guidelines](#commit-message-guidelines)
- [License](#license)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Bugs are tracked as [GitHub issues](https://github.com/OwitiH/convertksh/issues). When creating a bug report, please include:

1. A clear, descriptive title
2. Steps to reproduce the issue
3. Expected vs. actual behavior
4. Screenshots if applicable
5. Browser/device information

### Suggesting Enhancements

We welcome enhancement suggestions! Please:

1. Check if the feature has already been suggested
2. Clearly describe the feature and why it would be valuable
3. Include any relevant screenshots or mockups

### Your First Code Contribution

1. Fork the repository on GitHub
2. Clone your fork locally
3. Install dependencies: `npm install`
4. Create a new branch: `git checkout -b feature/your-feature-name`
5. Make your changes
6. Run tests: `npm test`
7. Commit your changes following our [commit guidelines](#commit-message-guidelines)
8. Push to your fork: `git push origin feature/your-feature-name`
9. Open a Pull Request

### Pull Requests

- Keep PRs focused on a single feature/bug
- Update documentation as needed
- Ensure all tests pass
- Reference any related issues
- Follow the project's coding standards

## Development Setup

1. **Prerequisites**
   - Node.js 16+ and npm 8+
   - Git

2. **Installation**
   ```bash
   # Clone the repository
   git clone https://github.com/OwitiH/convertksh.git
   cd convertksh
   
   # Install dependencies
   npm install
   
   # Start development server
   npm run dev
   ```

3. **Available Scripts**
   - `npm run dev` - Start development server
   - `npm run build` - Build for production
   - `npm run preview` - Preview production build
   - `npm run format` - Format code with Prettier
   - `npm run lint` - Lint code with ESLint
   - `npm run test` - Run tests

## Coding Standards

### JavaScript/TypeScript
- Use TypeScript for all new code
- Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Use ES6+ features where appropriate
- Add JSDoc comments for public functions

### Styling
- Use TailwindCSS utility classes
- For custom styles, use CSS modules
- Mobile-first responsive design

### File Structure
- Keep components in `/src/components`
- Page components in `/src/pages`
- Shared utilities in `/src/utils`
- Types in `/src/types`

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types**:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code changes that neither fix bugs nor add features
- `perf`: Performance improvements
- `test`: Adding or modifying tests
- `chore`: Changes to the build process or auxiliary tools

**Example**:
```
feat(calculator): add inflation calculator tool

Add a new calculator that tracks the value of KES over time using World Bank CPI data.

Closes #42
```

## License

By contributing to ConvertKSH, you agree that your contributions will be licensed under its MIT License.
