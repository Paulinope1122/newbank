'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan'); 
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const displayMovements = function(movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b ) : movements
    movs.forEach(function(mov, i){
        const type = mov > 0 ? 'deposit' : 'withdrawl'

      const html = `
      <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
        i + 1
      } ${type}</div>
      <div class="movements__value">${mov}</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
    });

  }

  const calcDisplaySummary = function(acc){
    const displayDeposit = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => {
      return acc + mov
    }, 0);
    labelSumIn.textContent = `${displayDeposit} EUR`;

    const displayWithdraw = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => {
      return acc + mov
    }, 0);
    labelSumOut.textContent = `${Math.abs(displayWithdraw)} EUR`

    const displayInterest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1} )
    .reduce((acc, int) => {
      return acc + int
    }, 0);
    labelSumInterest.textContent = `${displayInterest} EUR`
  }

  // const calcDisplayWithdraw = function(movements){
   
  // }

  const calcDisplayBalance = function(acc){
    acc.balance = acc.movements
    .reduce(function(acc, curr){
      return acc + curr
    }, 0);
    labelBalance.textContent = `${acc.balance} EUR`
  }


const creatingUsername = function(accs){
    accs.forEach(function(acc){
      acc.username = acc.owner
        .toLowerCase()
        .split(' ')
        .map(function(name){
         return name[0]
        })
        .join('')
    });
  }

creatingUsername(accounts)

const updateUI = function(acc){
  displayMovements(acc.movements);

  calcDisplayBalance(acc);

  calcDisplaySummary(acc);
};

let currentAccount;

btnLogin.addEventListener('click', function(e){
  e.preventDefault();
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);

  // console.log(currentAccount)

  if(currentAccount.pin = Number(inputLoginPin.value)){
    labelWelcome.textContent = `welcome back, ${currentAccount.owner.split(' ')[0]}`

    containerApp.style.opacity = 100
    inputLoginUsername.value = inputLoginPin.value = ''
    inputLoginPin.blur()

      updateUI(currentAccount) 
  }
});

btnTransfer.addEventListener('click', function(e){
  e.preventDefault()
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts
  .find(acc => acc.username === inputTransferTo.value);
  // console.log(amount, receiverAcc)

  inputTransferAmount.value = inputTransferTo.value = ''

  if(
     amount > 0 &&
     receiverAcc && 
     currentAccount.balance >= amount && 
     receiverAcc?.username !== currentAccount.username){

      // console.log('transfer Valid')
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(amount);

      updateUI(currentAccount)
     }
});

btnLoan.addEventListener('click', function(e){
  e.preventDefault()
  const amount = Number(inputLoanAmount.value)

  if(amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)){
    currentAccount.movements.push(amount)

    updateUI(currentAccount)
  }
  inputLoanAmount.value = ''
})

btnClose.addEventListener('click', function(e){
  e.preventDefault()
  
  if(inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin){
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);
    
    console.log(index)
    
    accounts.splice(index, 1)

    containerApp.style.opacity = 0
    labelWelcome.textContent = `Your account has been deleted, ${currentAccount.owner.split(' ')[0]}`

  }
  inputCloseUsername.value = inputClosePin.value = '';
})

let sorted = false
btnSort.addEventListener('click', function(e){
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted
})
// console.log(theResult)

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);


/////////////////////////////////////////////////
/*
let arr = ['a', 'b', 'c', 'd', 'e']

console.log(arr.slice(2,4));

const arr2 =['w', 'e', 'p']

console.log(arr2.reverse());

const letters = arr.concat(arr2)
console.log(letters)

console.log([...arr, ...arr2]);
console.log(letters.join(' - '));

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const mov of movements){
  if(mov > 0){
    console.log(`you deposited ${mov}`)
  } else{
    console.log(`you withdrew ${Math.abs(mov)}`)
  }
};
console.log('-- FOREACH --')

movements.forEach(function(mov, i, array){
  if(mov > 0){
    console.log(`Movement ${i + 1}: you deposited ${mov}`)
  } else{
    console.log(`Movement ${i + 1}: you withdrew ${Math.abs(mov)}`)
  }
})
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function(value, key, map){
  console.log(`${key}: ${value}`)
});

const currenciesUnique = new Set(['USD', 'GSD', 'EUR', 'EUR'])

currenciesUnique.forEach(function(value, key, set){ 
    console.log(`${key}: ${value}`)
})

const checkDogs = function(dogsJulia, dogsKate){

  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(0, 1)
  dogsJuliaCorrected.splice(-2)
  console.log(dogsJuliaCorrected)

    const dogs = dogsJuliaCorrected.concat(dogsKate);

    dogs.forEach(function(dog, i){
      if(dog >= 3){
        console.log(`dog number ${i + 1} is a adult and is ${dog} years old`);
      } else {
        console.log(`dog number ${i + 1} is an puppy and is still a puppy`);
      }
    })
}
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3])

const euroToUsd = 1.1

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const movementsUsd = movements.map(function(mov){
// return mov * euroToUsd
// });

const movementsUsd = movements.map((mov) => {
  return mov * euroToUsd
})

console.log(movementsUsd)

const forArr = [];

for(let i = 0; i < movements.length; i++){
  forArr.push(euroToUsd * movements[i])
}
console.log(forArr)


const deposit = movements.filter(function(fill){
  return fill < 0
})
console.log(deposit);

const withdrawl = [];

for(let i = 0; i < movements.length; i++){
if(movements[i] < 0){
  withdrawl.push(movements[i])
}
};
console.log(withdrawl)
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const balance = movements.reduce(function(acc, curr, i, arr){
  console.log(`iteration from ${i}: ${acc}`)
   
  return acc + curr
}, 0)

console.log(balance)
const movement = [200, 450, -400, 3000, -650, -130, 70, 1300];

const maxValue = movement.reduce(function(acc, mov){
  if(acc > mov){
    return acc
  } else {
    return mov
  }
}, movement[0]);
console.log(maxValue);

const calcAverageHuman = function(ages){
  const humanAges = ages.map(function(age){
  if (age <= 2){
    return 2 * age
  } else if(age > 2){
    return 16 + age * 4
  }
});

console.log(humanAges);

 const adultDogs = humanAges.filter(function(adu){
  return adu > 18
});
console.log(adultDogs);

  const average = adultDogs.reduce(function(acc, curr){
    return acc + curr / adultDogs.length
  }, 0) ;

    return average
}

console.log(calcAverageHuman([5, 2, 4, 1, 15, 8, 3], [16, 6, 10, 5, 6, 1, 4]))
const euroToUsd = 1.1
const totalDepositUsd = movements
        .filter(mov => mov > 0)
        .map(mov => mov * euroToUsd)
        .reduce((acc, mov) => acc + mov, 0)
        console.log(totalDepositUsd)

        const calcAverageHuman = function(movements){
          const average = movements
          .map(ages => ages <= 2 ? 2 * ages : 16 + ages * 4)
          .filter(ages => ages >= 18)
         return average
        }
        console.log(calcAverageHuman([5, 2, 4, 1, 15, 8, 3], [16, 6, 10, 5, 6, 1, 4]))

const account = accounts.find(mov => mov.owner === 'Jessica Davis');
console.log(account)


    
  const forFunction = function(){
    for(let i = 0; i < accounts.length; i++){
      if(accounts[i].owner === 'Jessica Davis'){
        return accounts[i]
      }
    }
  }  
  console.log(forFunction())
  // console.log(mamaJ)
*/

const x = new Array(7)
console.log(x)
// console.log(x.map(() => 5))

x.fill(1)
console.log(x)

const arr = [1, 2, 3, 4, 5, 6, 7]
arr.fill(23, 2, 5)
console.log(arr)