//Test if synchronous  or asynchronous
const foo =Rx.Observable.create((subscriber) => {
  print('Hello');
  subscriber.next(42);
  subscriber.next(25); // observable can return multiple values
});
 
print("Before")
foo.subscribe((x) => {
  print(x);
});
foo.subscribe((x) => {
    print(x*10);
  });
print("after")

/**
 * In RxJS, creating and subscribing to an observable is typically a synchronous operation 
 * unless asynchronous operators are used (like setTimeout, interval, or fromEvent).
 */


//convert a promise to an Observable 

const promise = new Promise ((resolve, reject)=>{
    setTimeout(()=>{
        resolve('Response')
    },1000)
})

const obsvPromise = Rx.Observable.fromPromise(promise)

obsvPromise.subscribe(result => print(result))

//creation of a timer

const timer = Rx.Observable.timer(3000) 
//const timer = Rx.Observable.interval(3000)  to repeat after a certain interval 
timer.subscribe(val => print("Timer"))

// of permit use to pass any value we want to the observable

const several = Rx.Observable.of('string', ['array', 2 , false],{test:"object"},true)

several.subscribe(res=>print(res))

//Cold observable data is created inside of it : exx all previous wants
//Hard observable data are outside it 
const a = Math.random()

const hard = Rx.Observable.create(observer =>{
    observer.next(a)
})
hard.subscribe(res=>print(`Hard observable 1: ${res}`))
hard.subscribe(res=>print(`Hard observable 2: ${res}`))

/**Map operator */
//permit you to transform values based on underline logique

const numbers = Rx.Observable.of(10,100,1000,1 , 8 ,5)
numbers
    .map(num => Math.log10(num))
    .subscribe(x=>print(x))

//Can help to convert the json string to JS
const data = '{"name":"james", "age":"21", "sex":"Male"}'
const call = Rx.Observable.of(data)

call
    .map(json =>JSON.parse(json))
    .subscribe(obj =>{
        print(obj.name)
        print(obj.sex)
        print(obj.age)
    })

/**Filter operator */
//Print operator base on the condition 

numbers
    //.first()  /only take the first element
    //.last()  /only take the last element
    .filter( n => n>=100)
    .subscribe(res => print(res))

/**Switch Map */
//Use when you have one observable you need to get the value before running the second observable

let clicks = Rx.Observable.fromEvent(document, 'click')
//start  an interval timer after eack click 
clicks.switchMap(click =>{
   // return Rx.Observable.interval(500)
})
.subscribe(res => print(res))

//takeUntil operator - complet an observable base on the value of another observable
//doWhile - take values until a certain condition set true 
//zip operator - combine 2 observable
//forkjoin - combine the 2 last values of the observable 
//catch - permit to catch any error


/** Subject */
//This an Observable with additional feature to broadcast some values 

const subject = new Rx.Subject()

const subA = subject.subscribe(val => print(`Sub A : ${val}`))
const subB = subject.subscribe(val => print(`Sub B : ${val}`))
//unsubscribe is use to cancel thez execution of a subscrition
subject.next('Hello')

setTimeout(()=>{
    subject.next('World')
},1000)





//function to print values to the browser
 function print(val){
    let element = document.createElement('p')
    element.innerText= val
    document.body.appendChild(element)
}


