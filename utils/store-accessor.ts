import { Store } from 'vuex'
import { getModule } from 'nuxt-property-decorator'
import CardModule from '~/store/modules/card'
import CardsModule from '~/store/modules/cards'
import SearchModule from '~/store/modules/search'
import ModalModule from '~/store/modules/modal'

let cardStore: CardModule
let cardsStore: CardsModule
let searchStore: SearchModule
let modalStore: ModalModule

function initialiseStores(store: Store<any>): void {
  cardStore = getModule(CardModule, store)
  cardsStore = getModule(CardsModule, store)
  searchStore = getModule(SearchModule, store)
  modalStore = getModule(ModalModule, store)
}

export { initialiseStores, cardStore, cardsStore, searchStore, modalStore }