import { ICard } from '~/types/card'
import { Module, VuexModule, VuexMutation } from 'nuxt-property-decorator'

@Module({
  name: 'modules/cards',
  stateFactory: true,
  namespaced: true
})
export default class CardsModule extends VuexModule {
  public cards: ICard[] = []
  public page: number = 1

  @VuexMutation
  public updateInformations({ cards, page }: { cards: ICard[], page: number }) {
    this.cards = cards
    this.page = page
  }
}