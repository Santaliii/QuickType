


interface IStack<T> {
  size(): number,
  push(letter: T): void,
  pop(): T | undefined,
  peek(): T | undefined
}

export default class letterStack<T> implements IStack<T> {

  private letterStack: T[] = []
  

  constructor(private capacity: number = Infinity){}

  push(letter: T) {
    if(this.size() === this.capacity){
      throw Error("Stack has reached maximum capacity")
    }
    this.letterStack.push(letter)
  }

  pop(): T | undefined {
    return this.letterStack.pop()
  }

  peek(): T | undefined {
    return this.letterStack[this.size() - 1]
  }

  size(): number {
    return this.letterStack.length
  }

  empty(): void {
    this.letterStack = []
  }

}






