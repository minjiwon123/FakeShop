// locale-en.js
(function () {
  console.log(
    'THE FAKE SHOP - English Patch Active with Perfect Receipt Translations!',
  );

  // 1. 전역 접미사 및 금액 자막단위 영문 전면 리매핑
  currentLang = 'en';
  unitQty = 'ea';
  unitWon = ' KRW';
  textModalTotal = 'TOTAL AMOUNT: ';
  textBtnBack = 'BACK';

  // 2. 부품 에셋 정보망의 실시간 이름을 영문으로 강제 치환
  assetsInfo[2030999].name = "Yujin's Eye";
  assetsInfo[1392010].name = "Prof. Oh's Eye";
  assetsInfo[5203344587].name = "Sekyung's Nose";
  assetsInfo[77588517748].name = "Dohyun's Mouth";
  assetsInfo[30920].name = "Bibi's Beauty Mark";

  // 3. 고정 키오스크 화면 엘리먼트 라벨 영문 치환
  document.getElementById('text-touch-msg').innerText = 'TOUCH TO START';
  document.getElementById('text-scan-title').innerText =
    'PLEASE SCAN THE BARCODE';
  document.getElementById('lbl-dash-name').innerText = 'ITEM NAME';
  document.getElementById('lbl-dash-qty').innerText = 'QTY';
  document.getElementById('lbl-dash-price').innerText = 'PRICE';
  document.getElementById('btn-open-cart').innerText = 'CHECKOUT';
  document.getElementById('text-modal-title').innerText = 'CONFIRM YOUR ORDER';
  document.getElementById('btn-final-pay').innerText = 'PLACE ORDER & PRINT';

  // 좌측 상단 통합 컨트롤 버튼 영문 체인지
  document.getElementById('btn-top-back').innerText = textBtnBack;

  // 4. 🌟 [수정] 영수증 출력 폼의 디테일 영역까지 놓치지 않고 완벽하게 영문 치환 주입
  document.getElementById('text-receipt-list-title').innerText =
    '[CONFIRMED ORDER LIST]';
  document.getElementById('text-receipt-total-qty').innerText = 'TOTAL QTY';
  document.getElementById('text-receipt-total-price').innerText =
    'TOTAL AMOUNT';
  document.getElementById('text-receipt-footer').innerHTML =
    'Thank you for visiting The Fake Shop~<br />Please come again!';

  // 5. 현재 사용자가 켜놓은 모니터 화면 상태(대시보드 또는 결제 확인창)에 맞게 텍스트 렌더링 동기화
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
