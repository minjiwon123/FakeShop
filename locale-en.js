// locale-en.js
(function () {
  console.log('THE FAKE SHOP - English Patch Active [Receipt Translation Fix]');

  // 1. 전역 접미사 및 단위 영문 갱신
  currentLang = 'en';
  unitQty = 'ea';
  unitWon = ' KRW';
  textModalTotal = 'TOTAL AMOUNT: ';
  textBtnBack = 'BACK';

  // 영수증용 영문 고정 텍스트 세트 완전 교체
  textRecListTitle = '[CONFIRMED ORDER LIST]';
  textRecTotalQty = 'TOTAL QTY';
  textRecTotalPrice = 'TOTAL AMOUNT';
  textRecFooter =
    'Thank you for visiting The Fake Shop~<br />Please come again!';

  // 2. 🌟 [핵심 수정] 영수증 인쇄 엔진이 낚아챌 수 있도록 assetsInfo의 기본 'name' 필드 자체를 영어로 전면 교체
  assetsInfo[2030999].name = "Yujin's Eye";
  assetsInfo[1392010].name = "Prof. Oh's Eye";
  assetsInfo[5203344587].name = "Sekyung's Nose";
  assetsInfo[77588517748].name = "Dohyun's Mouth";
  assetsInfo[30920].name = "Bibi's Beauty Mark";

  // 3. 메인 인터페이스 라벨 치환
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

  // 4. 현재 화면 상태에 맞춰 장바구니 새로고침
  if (document.getElementById('modal-cart').style.display === 'flex') {
    const list = document.getElementById('cart-list');
    list.innerHTML = '';

    const summary = {};
    let grandTotal = 0;

    scannedParts.forEach((p) => {
      // 🌟 실시간으로 변경된 assetsInfo 영문 이름을 추적합니다.
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
