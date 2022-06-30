<template>
  <div>
    <h1 id="leader" ref="leader">page: {{page}} , scroll: {{scroll}}, title: {{title}}</h1>
    <section>
      <input v-model="message">
      <input type="button" value="校验" @click="regExp()">
      <h3>isMatch: {{isMatch}}</h3>
    </section>
    <section id="office" class="office">
      <ul class="artical" id="artical">
        <li v-for="item in pointerEvent" :key="item">{{item}}</li>
      </ul>
      <p id="page"><a :href="blobURL" download="sample.txt">getBoundingClientRect, {{blobURL}}</a></p>
      <!-- <p><img src="../assets/images/office_2020.jpg" width="480" id="point"></p> -->
      <table cellspacing="2" cellpadding="4" border="1" border-color="#9080c5" width="50%">
        <tr>
          <th>排序</th>
          <th>应用名</th>
          <th>上行流速</th>
          <th>下行流速</th>
          <th>总流速</th>
        </tr>
        <tr v-for="(item, index) in list.value" :key="index">
          <td>{{item.sortID}}</td>
          <td>{{item.yyName}}</td>
          <td>{{item.upLl}}</td>
          <td>{{item.downLl}}</td>
          <td>{{item.countLl}}</td>
        </tr>
      </table>
    </section>
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue'
  const title = ref('App in setup')
  
  let page = reactive({
    x: 0,
    y: 0
  })
  let client = reactive({
    x: 0,
    y: 0,
    top: 0,
    left: 0
  })
  const getBoundRect = () => {
    // console.log(screen.availHeight, screen.availWidth)
    let img = document.querySelector('#point')
    let rect = img.getBoundingClientRect()
    console.log(rect);
    client.value.x = rect.x
    client.value.y = rect.y
  }
  let fleets = {
    name: 'reddargron',
    owner: 'Fleecks Medam',
    fleetId: 'F2346',
    vehicles: 24,
    mainLoad: 'Fruits, Vegitable, Coins, Pinuts, Rice, Beans',
    regAddress: 'Deltar Street A98-2, Rowe Area',
    _ownerId: '877629497334',
    _home: 'D093 Beta Street',
    _licenseId: 'O988-UR35',    
  }
  fleets = new Proxy(fleets, {
    get(target, key) {
      if(key in target) {
        return target[key]
      }else {
        return 'We\'ll receive the task as soon'
      }
    },
    set(target, key, value) {
      if(typeof value === 'number') {
        target[key] = value
        return true
      }else {
        return false
      }
    },
    ownKeys(target) {
      return Object.keys(target).filter(key => !key.startsWith('_'))
    },
    has(target, prop) {
      let loads = target.mainLoad.split(',')
      return loads.includes(prop)
    },
  })
  let blobURL = ref('#')
  const arrayBuffer = () => {    
    let blob = new Blob(['浏览器内部为每个通过 URL.createObjectURL 生成的 URL 存储了一个 URL → Blob 映射。因此，此类 URL 很短，但可以访问 Blob。'], {type: 'text/plain'})
    blobURL.value = URL.createObjectURL(blob)
  }

  let list = reactive([])
  let headers = reactive({})
  async function fetchData() {
    let url = '/api/bigscreen/apprunninginfo/yyls/list'
    let response = await fetch(url, {
      method: 'get'
    })
    if(response.ok) {
      let json = await response.json()
      list.value = json.data
      headers.value = response.headers
    }else {
      console.error(response.status, response.statusText);
    }
  }
  let isMatch = ref(false)
  let message = ref('')
  const regExp = () => {
    let regexp = /<(.*?)>/
    let str = '<h3>isMatch: {{isMatch}}</h3>'
    isMatch.value = str.match(regexp)
  }
</script>
<script>
  export default {
    data() {
      return {
        pointerEvent: ['pointer event'],
        scroll: '',
      }
    },
    mounted() {
      // this.customEvent()
      // this.pointAtDoc()
      // this.rangeDemo()
      this.arrayBuffer()
      this.regExp()
      // this.fetchData()
    },
    methods: {
      customEvent() {
        let elem = document.querySelector('#leader')
        let cEvent = new CustomEvent('jump', {
          detail: {
            name: 'Deltar 230k5m'
          }
        })
        elem.dispatchEvent(cEvent)
        window.addEventListener('jump', e => {
          console.log(e.detail.name);
        })
      },
      pointAtDoc() {
        const point = document.querySelector('#point')
        const office = document.querySelector('#office')
        point.addEventListener('pointerdown', this.handlePointerEvent)
        point.addEventListener('pointerup', this.handlePointerEvent)
        office.addEventListener('scroll', this.handleScroll)
      },
      handlePointerEvent(e) {        
        console.log(e)
        this.pointerEvent.push(`${e.isPrimary}, ${e.pointerId}, ${e.type}`)
      },
      handleScroll(e) {
        this.scroll = e.target.scrollTop
      },
      rangeDemo() {
        let page = document.querySelector('#page')
        let text = page.firstChild
        let range = new Range()
        range.setStart(text, 2)
        range.setEnd(text,7)
        console.log(range.toString())
      },
      taskDemo() {
        setTimeout(() => console.log("1.timeout"))
        Promise.resolve().then(() => console.log("2.promise"))
        console.log("3.code")
      }
    }
  }
</script>
<style scoped>
  h1 {
    text-align: center;
    /* position: fixed; */
    width: 100%;
    color: rgb(255, 255, 255);
  }
  .office {
    width: 100%;
    top: 48px;
    /* height: 30vh; */
    box-sizing: border-box;
    position: relative;
    /* display: flex;
    overflow: hidden; */
    padding: 16px;
    color: #fff;
    overflow:auto;
    background: rgba(0, 0, 0, 0.5);
    /* justify-content: flex-start;
    align-items: flex-start; */
  }
  .artical {
    width: 45%;
    margin: 16px auto;
    position: relative;
  }
  .office > div {
    margin-right: 16px;
    border-radius: 2%;
  }
</style>