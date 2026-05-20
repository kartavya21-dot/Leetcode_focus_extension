function hideProblemPage() {
    // Difficulty tag
    document.querySelectorAll("div").forEach(el => {
        if (el.dataset.focusProcessed) return;

        const text = el.textContent?.trim();

        if (
            text === "Easy" ||
            text === "Medium" ||
            text === "Hard"
        ) {
            el.classList.add("leetcode-focus-hidden");
            el.dataset.focusProcessed = true;
        }
    });

    // Acceptance section
    document.querySelectorAll("div").forEach(el => {
        if (el.dataset.focusProcessedAcceptance) return;

        const text = el.textContent?.trim();

        if (
            text &&
            text.includes("Acceptance")
        ) {
            const target =
                el.querySelector("span") ||
                el;

            target.classList.add("leetcode-focus-hidden");
            el.dataset.focusProcessedAcceptance = true;
        }
    });

    // Accepted count/fraction
    document.querySelectorAll("span").forEach(el => {
        if (el.dataset.focusProcessedCount) return;

        const text = el.textContent?.trim();

        // Match:
        // 1.2M/3.5M
        // 458K/1.1M
        // 230/900
        if (
            /^[\d.]+[KMB]?\/[\d.]+[KMB]?$/i.test(text)
        ) {
            el.classList.add("leetcode-focus-remove");
            el.dataset.focusProcessedCount = true;
        }
    });
}

function hideProblemsetPage() {

    document.querySelectorAll("div, p").forEach(el => {

        if (el.dataset.focusProcessed) return;

        const text = el.textContent?.trim();

        // Hide acceptance %
        if (/^\d+(\.\d+)?%$/.test(text)) {
            el.style.visibility = "hidden";
            el.dataset.focusProcessed = true;
        }

        // Hide difficulty
        if (
            text === "Easy" ||
            text === "Medium" ||
            text === "Hard" ||
            text === "Med."
        ) {
            el.style.visibility = "hidden";
            el.dataset.focusProcessed = true;
        }
    });

}

function runFocusMode() {

    const path = window.location.pathname;

    if (path.startsWith("/problems/")) {
        hideProblemPage();
    }

    if (path.startsWith("/problemset/")) {
        hideProblemsetPage();
    }
}

runFocusMode();

const observer = new MutationObserver(() => {
    runFocusMode();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});