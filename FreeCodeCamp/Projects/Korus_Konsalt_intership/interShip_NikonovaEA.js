// invoices.json [
const invoice = {
    "customer": "MDT",
    "performance": [
        {
            "playId": "Гамлет",
            "audience": 55,
            "type": "tragedy"
        },
        {
            "playId": "Ромео и Джульетта",
             "audience": 35,
             "type": "tragedy"
         },
        {
            "playId": "Отелло",
            "audience": 40,
            "type": "comedy" }
            ]
};

const state = {
    "performer": "Theatre",
    "performance": [
        {
            "playId": "Гамлет",
            "type": "tragedy"

        },
        {
            "playId": "Ромео и Джульетта",
            "type": "tragedy"
        },
        {
            "playId": "Отелло",
            "type": "comedy" }
            ],
     "comedyTracker": [
        {"customerName": 'MDT',
          'tracker': 0
        },
    ]
};

function defineNewCustomer(invoice) {
    const newCustomer = new function () {
        this.customerName = invoice.customer;
        this.tracker = 0;
    }
    let incomingCustomerName = invoice.customer;
    for (let item of state.comedyTracker) {
        if (item.customerName !== incomingCustomerName) {
            state.comedyTracker.push(newCustomer);
            return;
        }
    }

}
defineNewCustomer(invoice);

function getTracker(name) {
    for (let item of state.comedyTracker) {
        if (name === item.customerName){
            return item.tracker;
        }
    }
}
function setTracker() {
    let incomingCustomerName = invoice.customer;
    for (let item of state.comedyTracker) {
        if(item.customerName === incomingCustomerName && item.tracker < 10) {
            item.tracker++;
        } else if (item.customerName === incomingCustomerName && item.tracker === 10) {
            item.tracker = 0;
        }
    }
}

const format = (number) => new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 2
}).format(number);

function statement(invoice, state) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Счет для ${invoice.customer}\n`;

    for(let perf of invoice.performance) {
        for(let item of state.performance) {
            if(perf.playId === item.playId ) {
                const play = perf.playId;
                let thisAmount = 0;

                switch (perf.type) {
                    case "tragedy":
                        thisAmount = 40000;
                        if (perf.audience > 30) {
                            thisAmount += 1000 * (perf.audience - 30);
                        }
                        break;

                    case "comedy":
                        thisAmount = 30000;
                        setTracker();
                        if (perf.audience > 20) {
                            thisAmount += 10000 + 500 * (perf.audience - 20);
                        }
                        thisAmount += 300 * perf.audience;
                        break;

                    default:
                        console.log(new Error(`неизвестный тип: ${perf.type}`));
                        return;
                }
                // Добавление бонусов
                volumeCredits += Math.max(perf.audience - 30, 0);

                // Дополнительный бонус за каждые 10 комедий
                if ('comedy' === perf.type && getTracker(invoice.customer) % 10 === 0) {
                    volumeCredits += Math.floor(perf.audience / 5);
                }

                // Вывод строки счета
                result += `${play}: ${format(thisAmount / 100)}`;
                result += ` (${perf.audience} мест)\n`;
                totalAmount += thisAmount;
                result += `Итого с вас ${format(totalAmount / 100)}\n`;
                result += `Вы заработали ${volumeCredits} бонусов\n`;
                result += '======================\n';
            }
        }

    }
    return result;
}

statement(invoice, state);