// locale-en.js
(function () {
  console.log(
    'THE FAKE SHOP - English Patch Active [Full Scale Translation System]',
  );

  currentLang = 'en';
  unitQty = 'ea';
  unitWon = ' KRW';
  textModalTotal = 'TOTAL AMOUNT: ';
  textBtnBack = 'BACK';

  textRecListTitle = '[CONFIRMED ORDER LIST]';
  textRecTotalQty = 'TOTAL QTY';
  textRecTotalPrice = 'TOTAL AMOUNT';
  textRecFooter =
    'Thank you for visiting The Fake Shop~<br />Please come again!';

  assetsInfo[2030999].name = "Yujin's Eye";
  assetsInfo[1392010].name = "Prof. Oh's Eye";
  assetsInfo[5203344587].name = "Sekyung's Nose";
  assetsInfo[77588517748].name = "Dohyun's Mouth";
  assetsInfo[30920].name = "Bibi's Beauty Mark";

  // 🌟 [추가] 초기 인트로 화면(비디오 상태) 멘트도 영어로 즉시 오버라이트 체인지
  document.getElementById('text-touch-msg').innerText = 'TOUCH TO START';

  document.getElementById('text-scan-title').innerText =
    'PLEASE SCAN THE BARCODE';
  document.getElementById('lbl-dash-name').innerText = 'ITEM NAME';
  document.getElementById('lbl-dash-qty').innerText = 'QTY';
  document.getElementById('lbl-dash-price').innerText = 'PRICE';
  document.getElementById('btn-open-cart').innerText = 'CHECKOUT';
  document.getElementById('text-modal-title').innerText = 'CONFIRM YOUR ORDER';
  document.getElementById('btn-final-pay').innerText = 'PLACE ORDER & PRINT';

  document.getElementById('btn-top-back').innerText = textBtnBack;

  if (document.getElementById('modal-cart').style.display === 'flex') {
    const list = document.getElementById('cart-list');
    list.innerHTML = '';

    const summary = {};
    let grandTotal = 0;

    scannedParts.forEach((p) => {
      const currentName = assetsInfo[p.code].name;
      if (!summary[currentName]) {
        summary[currentName] = { count: 0, totalPrice: 0 };
      }
      summary[currentName].count += 1;
      summary[currentName].totalPrice += p.price;
      grandTotal += p.price;
    });

    Object.entries(summary).forEach(([name, data]) => {
      list.innerHTML += `
        <div style="display:flex; justify-content:space-between; margin-bottom:1.5vh;">
            <span>${name} (${data.count}${unitQty})</span>
            <span style="color:var(--stroke-orange); font-weight:900;">${data.totalPrice.toLocaleString()}${unitWon}</span>
        </div>
      `;
    });
    document.getElementById('cart-total-price').innerText =
      `${textModalTotal}${grandTotal.toLocaleString()}${unitWon}`;
  } else {
    updateDashboards();
  }
})();
