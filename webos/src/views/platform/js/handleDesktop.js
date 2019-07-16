export function handleGridLayout(){
    let direction = this.currentDirection;
    /*
     * 1.从上往下，从左往右 top-bottom-left-right
     * 2.从上往下，从右往左 top-bottom-right-left
     * 3.从下往上，从左往右 bottom-top-left-right
     * 4.从下往上，从右往左 bottom-top-right-left
     *
     * 5.从左往右，从上往下 left-right-top-bottom
     * 6.从左往右，从下往上 left-right-bottom-top
     * 7.从右往左，从上往下 right-left-top-bottom
     * 8.从右往左，从下往上 right-left-bottom-top
     * */
    // 计算格子数据

    // 1.通过窗口宽高、格子宽高，计算格子坐标
    let gridArr = [];
    // 每个图标宽高80px margin 10px
    let itemWidthHeight = this.itemWidthHeight || 100;
    // 处理宽高，保证存在最小宽高
    let height =
      document.body.clientHeight - 40 ||
      itemWidthHeight; /* 减去40px的状任务栏高度*/
    let width = document.body.clientWidth || itemWidthHeight;
    let xNum = Math.floor(width / itemWidthHeight);
    let yNum = Math.floor(height / itemWidthHeight);
    let offsetX = width - xNum * itemWidthHeight;
    let offsetY = height - yNum * itemWidthHeight;
    switch (direction) {
      case "top-bottom-left-right":
        // 从上往下，从左往右
        for (let i = 0; i < xNum; i++) {
          let yArr = [];
          for (let j = 0; j < yNum; j++) {
            let item = {
              leftTop: {
                x: i * itemWidthHeight,
                y: j * itemWidthHeight
              },
              rightBottom: {
                x: (i + 1) * itemWidthHeight,
                y: (j + 1) * itemWidthHeight
              },
              isOccupied: false
            };
            yArr.push(item);
          }
          gridArr.push(yArr);
        }
        break;
      case "top-bottom-right-left":
        // 从上往下，从右往左
        for (let i = xNum; i > 0; i--) {
          let yArr = [];
          for (let j = 0; j < yNum; j++) {
            let item = {
              leftTop: {
                x: (i - 1) * itemWidthHeight + offsetX,
                y: j * itemWidthHeight
              },
              rightBottom: {
                x: i * itemWidthHeight + offsetX,
                y: (j + 1) * itemWidthHeight
              },
              isOccupied: false
            };
            yArr.push(item);
          }
          gridArr.push(yArr);
        }
        break;
      case "bottom-top-left-right":
        // 从下往上，从左往右
        for (let i = 0; i < xNum; i++) {
          let yArr = [];
          for (let j = yNum; j > 0; j--) {
            let item = {
              leftTop: {
                x: i * itemWidthHeight,
                y: (j - 1) * itemWidthHeight + offsetY
              },
              rightBottom: {
                x: (i - 1) * itemWidthHeight,
                y: j * itemWidthHeight + offsetY
              },
              isOccupied: false
            };
            yArr.push(item);
          }
          gridArr.push(yArr);
        }
        break;
      case "bottom-top-right-left":
        // 从下往上，从右往左
        for (let i = xNum; i > 0; i--) {
          let yArr = [];
          for (let j = yNum; j > 0; j--) {
            let item = {
              leftTop: {
                x: (i - 1) * itemWidthHeight + offsetX,
                y: (j - 1) * itemWidthHeight + offsetY
              },
              rightBottom: {
                x: i * itemWidthHeight + offsetX,
                y: j * itemWidthHeight + offsetY
              },
              isOccupied: false
            };
            yArr.push(item);
          }
          gridArr.push(yArr);
        }
        break;
      case "left-right-top-bottom":
        // 从左往右，从上往下
        for (let j = 0; j < yNum; j++) {
          let xArr = [];
          for (let i = 0; i < xNum; i++) {
            let item = {
              leftTop: {
                x: i * itemWidthHeight,
                y: j * itemWidthHeight
              },
              rightBottom: {
                x: (i + 1) * itemWidthHeight,
                y: (j + 1) * itemWidthHeight
              },
              isOccupied: false
            };
            xArr.push(item);
          }
          gridArr.push(xArr);
        }
        break;
      case "left-right-bottom-top":
        // 从左往右，从下往上
        for (let j = yNum; j > 0; j--) {
          let xArr = [];
          for (let i = 0; i < xNum; i++) {
            let item = {
              leftTop: {
                x: i * itemWidthHeight,
                y: (j - 1) * itemWidthHeight + offsetY
              },
              rightBottom: {
                x: (i + 1) * itemWidthHeight,
                y: j * itemWidthHeight + offsetY
              },
              isOccupied: false
            };
            xArr.push(item);
          }
          gridArr.push(xArr);
        }
        break;
      case "right-left-top-bottom":
        // 从右往左，从上往下
        for (let j = 0; j < yNum; j++) {
          let xArr = [];
          for (let i = xNum; i > 0; i--) {
            let item = {
              leftTop: {
                x: (i - 1) * itemWidthHeight + offsetX,
                y: j * itemWidthHeight
              },
              rightBottom: {
                x: i * itemWidthHeight + offsetX,
                y: (j + 1) * itemWidthHeight
              },
              isOccupied: false
            };
            xArr.push(item);
          }
          gridArr.push(xArr);
        }
        break;
      case "right-left-bottom-top":
        // 从右往左，从下往上
        for (let j = yNum; j > 0; j--) {
          let xArr = [];
          for (let i = xNum; i > 0; i--) {
            let item = {
              leftTop: {
                x: (i - 1) * itemWidthHeight + offsetX,
                y: (j - 1) * itemWidthHeight + offsetY
              },
              rightBottom: {
                x: i * itemWidthHeight + offsetX,
                y: j * itemWidthHeight + offsetY
              },
              isOccupied: false
            };
            xArr.push(item);
          }
          gridArr.push(xArr);
        }
        break;
    }
    this.gridArr = gridArr;
}

