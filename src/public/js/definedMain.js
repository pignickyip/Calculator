let basicCal = new Vue({
    el: '#calculator',
    data: {
        digit: '',
        msg: '0',
        equation: '',
        cal: '',
        temp: '',
        tempOper: 0
    },
    methods: {
        input: function (num) {
            if (num === '.' && this.msg.includes('.'))
                return false;
            else if (this.msg === '0') {
                this.msg = num;
                this.digit = num;
            } else {
                this.digit += num;
                this.msg = this.digit;
            }
        },
        clear: function () {
            if (this.msg === '0')
                this.equation = '';
            this.msg = '0';
            this.digit = '';
        },
        operator: function (opt) {
            this.equation += this.msg;
            //            if (this.equation.match(/(^[0-9]*)+$/)) {
            //                this.equation = this.msg;
            //            } else {
            //                this.equation = this.digit;
            //            }

            if (this.equation)
                this.operatorHanlder(opt, 2)
        },
        percentage: function () {
            this.equation = '';
            this.msg = (this.msg / 100).toString();
            this.digit = this.msg;
        },
        inverse: function () {
            if (this.msg == 0)
                return false;
            this.equation = '';
            if (this.msg[0] == '-')
                this.msg = this.msg.substr(1);
            else
                this.msg = '-' + this.msg;
            this.digit = this.msg;
        },
        equal: function () {
            if (this.temp && this.tempOper === 1) {
                if (!this.msg.match(/(^[0-9]*)+$/)) {
                    console.log('ff')
                } else {
                    let bastante = Math.pow(this.temp, this.msg);
                    this.equation = '';
                    this.msg = bastante;
                    this.digit = bastante;
                    this.cal = '';
                    this.temp = '';
                    this.tempOper = 0;
                }
            } else if (this.temp && this.tempOper === 2) {
                if (!this.msg.match(/(^[0-9]*)+$/)) {
                    console.log('ff')
                } else {
                    let bastante = Math.pow(this.temp, (1 / this.msg));
                    this.equation = '';
                    this.msg = bastante;
                    this.digit = bastante;
                    this.cal = '';
                    this.temp = '';
                    this.tempOper = 0;
                }
            } else if (this.equation === '') {
                return;
            } else if (this.cal !== '') {
                this.equation += this.msg;
                this.operatorHanlder('', 1);
            } else {
                return;
            }
        },
        parentheses: function (f) {
            //this.check();
            if (f === 0) {
                //if (this.equation ) {
                this.temp = this.equation;
                this.msg = '';
                this.equation = '';
                //}
            } else if (f === 1) {
                if (this.temp) {
                    if (this.temp.match(/(^[0-9]*)+$/)) {
                        return;
                    } else {
                        let bastante = this.temp + this.msg
                        this.equation = bastante
                        this.temp = '';
                        //console.log(this.equation)
                        this.operatorHanlder('', 1)
                    }
                }
            }
        },
        pow: function (v, f) {
            let temp = this.msg;
            if (f === 0) {
                this.msg = Math.pow(temp, v);
            } else if (f === 1) {
                this.temp = this.msg;
                this.tempOper = 1;
                this.msg = '0';
            } else if (f === 2) {
                this.msg = Math.exp(temp).toFixed(10)
            } else if (f === 3) {
                if (parseFloat(temp) > 10) {
                    temp = 10
                }
                this.msg = Math.pow(10, temp)
            }
            this.digit = this.msg;
            this.cal = '';
        },
        sqrt: function (f) {
            // Square Root
            let temp = this.msg;
            if (f === 2) {
                this.msg = Math.sqrt(temp);
            } else if (f === 3) {
                this.msg = Math.cbrt(temp);
            } else if (f === 4) {
                this.temp = this.msg;
                this.tempOper = 2;
                this.msg = '0';
            }
            this.digit = this.msg;
            this.cal = '';
            // Cube Root  
        },
        trigonometric: function (i, t) {
            return;
        },
        myValueChange: function (f) {
            if (f === 0) {
                this.msg = Math.E.toFixed(10);
            } else if (f === 1) {
                this.msg = Math.PI.toFixed(10);
            } else if (f === 2) {
                this.msg = Math.random().toFixed(10);
            }
            //this.digit = this.msg;
        },
        specialOperator: function (f) {
            if (f === 0) {
                this.msg = (1 / parseFloat(this.msg)).toFixed(10);
            } else if (f === 1) { //log base e
                this.msg = Math.log(this.msg).toFixed(10);
            } else if (f === 2) { //log base 10
                this.msg = Math.log10(this.msg).toFixed(10);
            } else if (f === 3) { //x!
                this.msg = this.factorialFunction(Math.round(this.msg))
            } else if (f === 4) { //EE
            } else if (f === 5) { //RAD
            }
            // this.digit = this.msg
        },
        msgChangeHandler: function (e) {
            let temp = this.msg;
            //            if (temp.match(/^([0-9\-])+$/g)) {
            //                console.log("ds")
        },
        operatorHanlder: function (calVal, flag) {
            this.msg = eval(this.equation).toString();
            this.digit = '';
            this.cal = calVal;
            if (flag === 1) {
                this.equation = '';
            } else if (flag === 2) {
                this.equation = this.msg + calVal
            }
        },
        factorialFunction: function (num) {
            if (num === 0) {
                return 1;
            } else {
                return num * this.factorialFunction(num - 1);
            }
        },
        check: function () {
            console.log(this.equation)
            console.log(this.digit)
            console.log(this.msg)
        },
        machineOperator: async function (flag) {
            if (flag === 0) {
                await machineFunction('/machine/clear', {
                    username: 'nick'
                }, flag)
                this.clear();
            } else if (flag === 1) {
                await machineFunction('/machine/store', {
                    data: this.msg,
                    username: 'nick'
                }, flag)
                this.clear();
            } else if (flag === 2) {
                this.msg = await machineFunction('/machine/result', {
                    username: 'nick'
                }, flag);
                this.digit = this.msg;
            } else if (flag === 3) { //M+
                this.msg = await machineFunction('/machine/operate', {
                    digit: this.msg,
                    operator: 2,
                    username: 'nick'
                }, flag);
                this.digit = this.msg;
            } else if (flag === 4) {
                this.msg = await machineFunction('/machine/operate', {
                    digit: this.msg,
                    operator: 3,
                    username: 'nick'
                }, flag);
                this.digit = this.msg;
            }
        }
    }
})
