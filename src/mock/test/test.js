import Mock from 'mockjs'
//获取mock.Random对象
const Random = Mock.Random

//mock一组数据
const produceNewData = function(){
    let articles = [];
    for(let i = 0; i < 15; i++){
        let newArticleObject = {
            addr: Mock.mock('@county(true)'),
            name: Random.cname(),
            date: Random.date(),
            email: Mock.mock('@EMAIL()')
        }
        articles.push(newArticleObject)
    }

    return {
        articles: articles
    }
}

Mock.mock('/news/api','post',produceNewData)