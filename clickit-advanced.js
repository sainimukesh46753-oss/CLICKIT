/* CLICKIT advanced feature pack — browser demo only */
(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const read = (key, fallback) => {
    try { return JSON.parse(localStorage.getItem("clickit_" + key) || JSON.stringify(fallback)); }
    catch (_) { return fallback; }
  };
  const write = (key, value) => localStorage.setItem("clickit_" + key, JSON.stringify(value));
  const show = (id, value) => { const el = $(id); if (el) el.textContent = value; };
  let points = read("rewards", 0);
  let compare = read("compare", []);
  let subscriptions = read("subscriptions", []);
  let shared = read("group", []);
  let inventory = read("stock", []);
  let partners = read("riders", []);
  let tickets = read("support", []);
  const earn = (n) => { points += n; write("rewards", points); show("pointsTotal", points + " points"); show("opsPoints", points); };
  const list = (id, rows, format) => { const el = $(id); if (!el) return; el.replaceChildren(); rows.forEach((row) => { const p = document.createElement("p"); p.textContent = format(row); el.append(p); }); };
  $("aiSuggest")?.addEventListener("click", () => {
    const need = $("aiNeed").value.trim().toLowerCase();
    if (!need) return show("aiResult", "Tell us what you need first.");
    const items = /breakfast|morning/.test(need) ? ["Milk", "Bread", "Eggs", "Bananas"] :
      /party|snack/.test(need) ? ["Chips", "Cold drink", "Cookies", "Namkeen"] :
      ["Milk", "Rice", "Atta", "Fresh vegetables"];
    show("aiResult", "Suggested basket: " + items.join(" · ") + ". These are sample suggestions; add products from the shop to your cart.");
    earn(2);
  });
  $("addCompare")?.addEventListener("click", () => {
    const value = $("compareName").value.trim(); if (!value) return;
    compare = [...new Set([...compare, value])].slice(-4); write("compare", compare);
    list("compareList", compare, (x) => x); $("compareName").value = "";
  });
  $("addSub")?.addEventListener("click", () => {
    const name = $("subItem").value.trim(); if (!name) return;
    subscriptions.push({ name, days: $("subEvery").value }); write("subscriptions", subscriptions);
    list("subList", subscriptions, (x) => x.name + " · every " + x.days + " days"); $("subItem").value = "";
  });
  $("barcodeFind")?.addEventListener("click", () => {
    const code = $("barcodeInput").value.trim();
    show("scanResult", code ? "Code entered: " + code + ". A product barcode database must be connected to identify it." : "Enter a barcode first.");
  });
  $("voiceFind")?.addEventListener("click", () => {
    const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Speech) return show("scanResult", "Voice search is not supported in this browser. Type your search instead.");
    const recognition = new Speech(); recognition.lang = "en-IN";
    recognition.onresult = (event) => {
      const phrase = event.results[0][0].transcript; $("search").value = phrase;
      $("search").dispatchEvent(new Event("input")); show("scanResult", "Searching for: " + phrase);
    };
    recognition.onerror = () => show("scanResult", "Microphone unavailable. Check browser permission.");
    recognition.start();
  });
  $("spinWin")?.addEventListener("click", () => {
    const prizes = ["5 bonus points", "10 bonus points", "Try again", "Free delivery (demo)"];
    const prize = prizes[Math.floor(Math.random() * prizes.length)]; show("spinResult", "You got: " + prize);
    const match = prize.match(/(\d+) bonus points/); if (match) earn(Number(match[1]));
  });
  $("copyRef")?.addEventListener("click", async () => {
    const code = $("refCode").value;
    try { await navigator.clipboard.writeText(code); show("refResult", "Invite code copied."); }
    catch (_) { show("refResult", "Your invite code: " + code); }
  });
  $("addGroupItem")?.addEventListener("click", () => {
    const item = $("groupItem").value.trim(); if (!item) return;
    shared.push(item); write("group", shared); list("groupList", shared, (x) => x); $("groupItem").value = "";
    show("opsLists", shared.length);
  });
  document.querySelectorAll(".ops-tab").forEach((tab) => tab.addEventListener("click", () => {
    document.querySelectorAll(".ops-tab").forEach((x) => x.classList.toggle("active", x === tab));
    document.querySelectorAll(".ops-panel").forEach((panel) => { panel.hidden = panel.id !== tab.dataset.panel; });
  }));
  $("stockAdd")?.addEventListener("click", () => {
    const name = $("stockName").value.trim(), quantity = Number($("stockQty").value);
    if (!name || !Number.isFinite(quantity) || quantity < 0) return;
    inventory.push({ name, quantity }); write("stock", inventory);
    list("stockRows", inventory, (x) => x.name + " — " + x.quantity + " units");
  });
  $("riderAdd")?.addEventListener("click", () => {
    const name = $("riderName").value.trim(); if (!name) return;
    partners.push({ name, status: $("riderStatus").value }); write("riders", partners);
    list("riderRows", partners, (x) => x.name + " — " + x.status);
  });
  $("supportAdd")?.addEventListener("click", () => {
    const note = $("supportQuestion").value.trim(); if (!note) return;
    tickets.push(note); write("support", tickets); list("supportRows", tickets, (x) => x); $("supportQuestion").value = "";
  });
  show("pointsTotal", points + " points"); show("opsPoints", points);
  show("opsWish", read("wishlist", []).length); show("opsLists", shared.length); show("opsOrders", read("orders", []).length);
  list("compareList", compare, (x) => x);
  list("subList", subscriptions, (x) => x.name + " · every " + x.days + " days");
  list("groupList", shared, (x) => x);
  list("stockRows", inventory, (x) => x.name + " — " + x.quantity + " units");
  list("riderRows", partners, (x) => x.name + " — " + x.status);
  list("supportRows", tickets, (x) => x);
})();