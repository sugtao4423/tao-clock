export default interface BannerTopics {
  type: 'topics'
  list: {
    txt: string
    img: string
    url: string
    edit_tm: number
  }[]
}
