const calculateDebt = (payments) => {
    const totals = {
        "Juan Cruz": {
            "Santi": 0,
            "Gaen": 0
        },
        "Santi": {
            "Juan Cruz": 0,
            "Gaen": 0
        },
        "Gaen": {
            "Juan Cruz": 0,
            "Santi": 0
        }
    }

    payments.forEach(payment => {
        payment.benefactors.forEach(benefactor => {
            if(benefactor !== payment.user) {
                totals[benefactor][payment.user] += (payment.amount/payment.benefactors.length)
            }
        })
    })

    const debts = {
        "Juan Cruz": {
            "Santi": 0,
            "Gaen": 0
        },
        "Santi": {
            "Juan Cruz": 0,
            "Gaen": 0
        },
        "Gaen": {
            "Juan Cruz": 0,
            "Santi": 0
        }
    }

    Object.keys(totals).forEach(payee => {
        Object.keys(totals[payee]).forEach(payer=> {
            debts[payee][payer] = totals[payee][payer] - totals[payer][payee]
        })
    })

    return debts;
}

export default calculateDebt;
