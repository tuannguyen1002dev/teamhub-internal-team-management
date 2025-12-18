module.exports = {
  plugins: ["boundaries"],
  settings: {
    "boundaries/elements": [
      { type: "app", pattern: "src/app/**" },
      { type: "feature", pattern: "src/features/*/**" },
      { type: "ui", pattern: "src/components/ui/**" },
      { type: "lib", pattern: "src/lib/**" },
    ],
  },
  rules: {
    "boundaries/element-types": [
      "error",
      {
        default: "disallow",
        rules: [
          {
            from: "app",
            allow: ["feature", "ui", "lib"],
          },
          {
            from: "feature",
            allow: ["ui", "lib"],
          },
          {
            from: "ui",
            allow: ["ui", "lib"],
          },
          {
            from: "lib",
            allow: ["lib"],
          },
        ],
      },
    ],
  },
};
