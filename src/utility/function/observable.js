class SubScriber {
  constructor() {
    this.steps = []
  }

  next(callback) {
    this.steps.push(callback)
  }

  error(callback) {
    this.err = callback
  }

  complete(callback) {
    this.steps.push(callback)
    this.steps.push('complete')
  }
}
/**
 * @example
 * ```js
  const run = () => {...}
  const end = () => {...}
  const observable = new Observable(subscriber => {
    subscriber.next(run)
    subscriber.error(err => {
      console.log(err)
    })
    subscriber.complete(() => {
      end()
    })
  })
  observable.run()
 * ```
 */
export default class Observable {
  constructor(init) {
    this.subscriber = new SubScriber()
    init(this.subscriber)
  }

  run() {
    const steps = this.subscriber.steps
    if (steps.length) {
      const action = (index = 0, data) => {
        if (steps[index] && typeof steps[index] === 'function') {
          const promise = steps[index](data)
          if (promise instanceof Promise) {
            promise
              .then(() => {
                action(index + 1, data)
              })
              .catch(this.subscriber.err)
          }
        }
      }
      action()
    }
  }
}
