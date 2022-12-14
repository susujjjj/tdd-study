//UI를 위한 UI에서 처리하는 로직들을 담고있음
export default class HabitPresenter {
  //constructor에서 초기값을 받을수있어요
  constructor(habits, maxHabits) {
    //외부에서 받아오면 재사용성도 높고 설정해서 쓸 수 있어서 산편, 테스트성도 올릴수있음
    //처음 habit을 받아와서 이 habit부터 시작하기
    this.habits = habits
    this.maxHabits = maxHabits
  }

  //그러면 getHabits이라는 함수를 통해서
  //항상 이 presenter에 있는 habit을 외부에서 접근할수있도록
  //외부에서 확인이 가능하도록 만들면 좋겠죠?
  getHabits() {
    return this.habits
  }

  //이제 이 HabitPresenter는 특정한 Habit에 대해서 Count를 증가할수있어요

  increment(habit, update) {
    //내가 어떤 습관을 count를 증가할건지 인자로 받아서
    //이 habit에 한해서 count를 하나 증가해줄거임
    //그래서 이 presenter에서 가지고있는 habit은 새로운 habit으로 업데이트 해줄텐데
    this.habits = this.habits.map((item) => {
      if (item.id === habit.id) {
        return { ...habit, count: habit.count + 1 } // 카운트를 증가한 새로운 오브젝트를 만들고, 그외에는 기존 아이템을 유지
      }
      return item //그외에는 기존 아이템을 유지하는 새로운 배열을 만들어서 다시 habit에 할당해줄거에요!
    })

    update(this.habits)
  }

  decrement(habit, update) {
    this.habits = this.habits.map((item) => {
      if (item.id === habit.id) {
        const count = habit.count - 1
        return { ...habit, count: count < 0 ? 0 : count }
      }
      return item
    })
    update(this.habits)
  }

  delete(habit, update) {
    this.habits = this.habits.filter((item) => item.id !== habit.id)
    update(this.habits)
  }

  add(name, update) {
    //지금 가지고 있는 habit의 갯수가 우리가 추가할 수 있는. 예를들어 maxHabits이라는 이 갯수랑 똑같다면, 더이상 추가가 안되게 만들고 싶어요
    //그러면 add라는 함수 안에서 지금 가지고 있는 습관의 갯수와 우리가 총 가질수 있는 갯수가 똑같다면,
    //더이상 새로운걸 추가하면 안되겠죠?
    //그래서 error를 던진다고 가정해보자.
    if (this.habits.length === this.maxHabits) {
      throw new Error(`습관의 갯수는 ${this.maxHabits} 이상이 될 수 없습니다`)
    }
    this.habits = [...this.habits, { id: Date.now(), name, count: 0 }]
    update(this.habits)
  }

  reset(update) {
    this.habits = this.habits.map((habit) => {
      if (habit.count !== 0) {
        return { ...habit, count: 0 }
      }
      return habit
    })
    update(this.habits)
  }
}
