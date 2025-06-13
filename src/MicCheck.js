import NativeInterface from "./NativeInterface";

const Mic = {
    checkPermission: function (cb) {
        console.log("wrapper in")
        NativeInterface?.checkPermission(cb)
    },
    test: function() {
        console.log("test in")
        NativeInterface?.test()
    },
    startMeasure: function (tone ) {
        console.log("measure start wrapper in mic")
        NativeInterface?.measureStart(tone)
    },
    stopMeasure: function () {
        console.log("measure stop call")
        NativeInterface?.measureStop()
    },
    lock_in: function (order, cb) {
        NativeInterface?.confirmed(order, cb)
    },
}

export default Mic