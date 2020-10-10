// 此文件存放一些前端基本算法

// 1-冒泡排序
(function () {
  var arr = [22, 23, 111, 1, 2];
  function bubbleSort (arr) {

    // 检测传入的 arr 是否为数组，如果不是数组，直接返回该本身
    if (Object.prototype.toString.call(arr) !== '[object Array]') {
      return arr;
    }

    var len = arr.length;

    // 如果长度为1或者为0，直接返回该数组
    if (len <= 1) {
      return arr;
    }

    for (var i = 0; i < len - 1; i++) {
      for (var j = 0; j < len - 1 - i; j++) {

        if (arr[j] > arr[j + 1]) {
          var temp = arr[j + 1];
          arr[j + 1] = arr[j];
          arr[j] = temp;
        }

      }
    }

    return arr;
  }

  console.log(bubbleSort(arr));
})();

// 2-new
// new的作用:
// 1、创建一个新的对象
// 2、该对象的_proto_属性指向该构造函数的原型,即Fn.prototype
// 3、将执行上下文的this指向新创建的对象
// 4、如果构造函数有返回值,那么这个返回值将取代第一步中新建的对象
(function () {
  function New (Fn, ...arg) {
    // 一个新的对象被创建
    const result = {};
    // 该对象的__proto__属性指向该构造函数的原型
    if (Fn.prototype !== null) {
      Object.setPrototypeOf(result, Fn.prototype);
    }
    // 将执行上下文（this）绑定到新创建的对象中
    const returnResult = Fn.apply(result, arg);
    // 如果构造函数有返回值，那么这个返回值将取代第一步中新创建的对象。否则返回该对象
    if ((typeof returnResult === "object" || typeof returnResult === "function") && returnResult !== null) {
      return returnResult;
    }
    return result;
  }
})();

// 3-数组扁平化总结
(function () {
  let ary = [1, [2, [3, [4, 5]]], 6];
  let str = JSON.stringify(ary);

  // 方法1 利用flat
  arr_flat = arr.flat(Infinity);

  // 方法2 正则匹配
  ary = str.replace(/(\[\]))/g, '').split(',');

  // 方法3 扩展运算符
  while (ary.some(Array.isArray)) {
    ary = [].concat(...ary);
  }

  // 方法4 递归处理
  function flatten (ary) {
    return ary.reduce((pre, cur) => {
      return pre.concat(Array.isArray(cur) ? flatten(cur) : cur);
    })
  }
  let ary = [1, 2, [3, 4], [5, [6, 7]]]
  console.log(ary.MyFlat(Infinity))
})();

// 4-call
(function () {
  Function.prototype.call1 = function (context, ...args) {
    // 获取第一个参数（注意第一个参数为null或undefined是，this指向window），构建对象
    context = context ? Object(context) : window;
    // 将对应函数传入该对象中
    context.fn = this;
    // 获取参数并执行相应函数
    let result = context.fn(...args);
    delete context.fn;
  }
})();

// 5-apply
(function () {
  Function.prototype.apply1 = function (context, arr) {
    context = context ? Object(context) : window;
    context.fn = this;

    let result = arr ? context.fn(...arr) : context.fn();

    delete context.fn;

    return result;
  }
})();