// Highlight active nav link
(function() {
    const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    document.querySelectorAll(".links a").forEach((a) => {
        const href = (a.getAttribute("href") || "").toLowerCase();
        if (href.endsWith(path)) a.classList.add("active");
    });
})();

/**
 * Serial Gate (Products page)
 * - User must enter a serial number to enable download buttons.
 * - Client-side only (for real security you need backend validation).
 */
(function serialGate() {
    const input = document.getElementById("serialInput");
    const btn = document.getElementById("serialCheckBtn");
    const msg = document.getElementById("serialMsg");
    const links = document.querySelectorAll("[data-download]");

    if (!input || !btn || !msg || links.length === 0) return;

    function setEnabled(enabled) {
        links.forEach((a) => {
            a.setAttribute("aria-disabled", enabled ? "false" : "true");
            a.tabIndex = enabled ? 0 : -1;
        });
    }

    // default disabled
    setEnabled(false);

    function validateSerial(s) {
        // Example: HARMONY-12AB-9ZK3
        return /^HARMONY-[A-Z0-9]{4}-[A-Z0-9]{4}$/i.test((s || "").trim());
    }

    btn.addEventListener("click", () => {
        const serial = input.value.trim();
        if (validateSerial(serial)) {
            msg.textContent = "Serial verified ✅ Downloads unlocked.";
            msg.style.color = "rgba(14,210,133,.95)";
            setEnabled(true);
        } else {
            msg.textContent = "Invalid serial. Example: HARMONY-12AB-9ZK3";
            msg.style.color = "rgba(255,120,120,.95)";
            setEnabled(false);
        }
    });
})();

/**
 * Contact form -> open email client
 */
(function wireMailForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = (document.getElementById("name") ? .value || "").trim();
        const email = (document.getElementById("email") ? .value || "").trim();
        const subject = (document.getElementById("subject") ? .value || "").trim();
        const message = (document.getElementById("message") ? .value || "").trim();

        const to = "ezzattarek14@gmail.com";
        const fullSubject = subject ? `HARMONY — ${subject}` : "HARMONY — Contact request";

        const body = `Name: ${name}
Email: ${email}

Message:
${message}

---
Sent from HARMONY website`;

        const mailto = `mailto:${to}?subject=${encodeURIComponent(fullSubject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailto;

        const note = document.getElementById("formNote");
        if (note) note.textContent = "Opening your email app to send the message…";
    });
})();

/**
 * Order form -> open email client with order details
 */
(function orderForm() {
    const form = document.getElementById("orderForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const to = "ezzattarek14@gmail.com";

        const fullName = (document.getElementById("o_name") ? .value || "").trim();
        const email = (document.getElementById("o_email") ? .value || "").trim();
        const phone = (document.getElementById("o_phone") ? .value || "").trim();
        const address = (document.getElementById("o_address") ? .value || "").trim();

        const headSize = document.getElementById("head_size") ? .value || "";
        const armSize = document.getElementById("arm_size") ? .value || "";
        const handSize = document.getElementById("hand_size") ? .value || "";
        const armSide = document.getElementById("arm_side") ? .value || "";

        const serial = (document.getElementById("o_serial") ? .value || "").trim();

        const subject = `HARMONY — New Order Request (${fullName || "Customer"})`;

        const body = `NEW ORDER REQUEST

Customer:
- Name: ${fullName}
- Email: ${email}
- Phone: ${phone}
- Address: ${address}

Selections:
- Head size: ${headSize}
- Arm size: ${armSize}
- Hand size: ${handSize}
- Arm side: ${armSide}

Serial Number (optional): ${serial}

Notes:
- Please confirm availability, shipping, and final invoice.

---
Sent from HARMONY Order Page`;

        const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailto;

        const note = document.getElementById("orderNote");
        if (note) note.textContent = "Opening your email app to send the order request…";
    });
})();