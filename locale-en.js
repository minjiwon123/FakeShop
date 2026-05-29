// locale-en.js
(function () {
  console.log('THE FAKE SHOP - English Patch Injected!');

  // 1. 전역 접미사 및 금액 자막(Total Label) 영어로 전면 갱신
  currentLang = 'en';
  unitQty = 'ea';
  unitWon = ' KRW';
  textModalTotal = 'TOTAL AMOUNT: ';

  // 2. 부품 정보 한글 이름을 영문 텍스트로 오버라이트 강제 치환
  assetsInfo[2030999].name = "Yujin's Eye";
  assetsInfo[1392010].name = "Prof. Oh's Eye";
  assetsInfo[5203344587].name = "Sekyung's Nose";
  assetsInfo[77588517748].name = "Dohyun's Mouth";
  assetsInfo[30920].name = "Bibi's Beauty Mark";

  // 3. 고정 UI 엘리먼트 라벨 영문 치환 정렬
  document.getElementById('text-touch-msg').innerText = 'TOUCH TO START';
  document.getElementById('text-scan-title').innerText =
    'PLEASE SCAN THE BARCODE';
  document.getElementById('lbl-dash-name').innerText = 'ITEM NAME';
  document.getElementById('lbl-dash-qty').innerText = 'QTY';
  document.getElementById('lbl-dash-price').innerText = 'PRICE';
  document.getElementById('btn-open-cart').innerText = 'CHECKOUT';
  document.getElementById('text-modal-title').innerText = 'CONFIRM YOUR ORDER';
  document.getElementById('btn-final-pay').innerText = 'PLACE ORDER & PRINT';

  // 4. 프린트 영수증 하이드 영역 전사
  document.getElementById('text-receipt-list-title').innerText =
    '[CONFIRMED ORDER LIST]';
  document.getElementById('text-receipt-total-qty').innerText = 'TOTAL QTY';
  document.getElementById('text-receipt-total-price').innerText =
    'TOTAL AMOUNT';
  document.getElementById('text-receipt-footer').innerHTML =
    'Your identity data has been successfully collected.<br />Thank you for visiting.';

  // 5. 🌟 [수정] 화면의 display 상태를 건드리지 않고, 현재 켜져 있는 화면의 데이터 텍스트만 실시간 갱신!
  if (document.getElementById('modal-cart').style.display === 'flex') {
    // 🛒 장바구니 창이 열려있을 때: 화면 전환 없이 글자랑 총금액만 영문 업데이트
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
    // 📸 메인 스캔 화면일 때: 하단 대시보드 텍스트 업데이트
    updateDashboards();
  }
})();
