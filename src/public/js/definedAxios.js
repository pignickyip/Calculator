function machineFunction(url, data, flag) {
    return axios.post(url, data).then(function (responese) {
            //console.log(responese)
            if (responese.msg === 404) {
                console.log('Error')
            } else {
                if (flag === 1 || flag === 0) {
                    return 0.0
                } else if (flag > 1 && flag < 5) {
                    // myD.push(parseFloat(responese.data.record))
                    return responese.data.result;
                }
            }
        })
        .catch(function (error) {
            console.log(error);
        });

}
