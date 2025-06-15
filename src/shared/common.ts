function getCurrentDomain() {
    const parts = typeof window !== "undefined" ? window.location.hostname : process.env.HOST_NAME;
    return parts;
}

export { getCurrentDomain };
