const categories =
  [
    {
      "id": 84,
      "name": "新兴技术",
      "slug": "technology",
    },
    {
      "id": 76,
      "name": "职业发展",
      "slug": "career-hacks",
    },
    {
      "id": 14,
      "name": "敏捷",
      "slug": "agile",
    },
    {
      "id": 83,
      "name": "软件测试",
      "slug": "software-testing"
    },
    {
      "id": 85,
      "name": "转型",
      "slug": "transformation"
    },
    {
      "id": 79,
      "name": "创新",
      "slug": "innovation",

    },
    {
      "id": 261,
      "name": "商业",
      "slug": "business",

    },
    {
      "id": 88,
      "name": "社会与技术",
      "slug": "society-and-technology",

    },
    
    {
      "id": 604,
      "name": "微服务",
      "slug": "microservices",
      "taxonomy": "category",

    },
    {
      "id": 78,
      "name": "体验设计",
      "slug": "experience-design",

    },
    {
      "id": 42,
      "name": "技术雷达",
      "slug": "radar",

    },
    {
      "id": 81,
      "name": "产品策略",
      "slug": "product-strategy",

    },
    {
      "id": 605,
      "name": "DevOps",
      "slug": "devops",

    },
    {
      "id": 606,
      "name": "BSI",
      "slug": "bsi",

    },
    {
      "id": 82,
      "name": "零售",
      "slug": "retail",

    },
    {
      "id": 86,
      "name": "互联网金融",
      "slug": "internet-of-finance",

    },
    {
      "id": 75,
      "name": "大数据",
      "slug": "bigdata-analytics",

    },
    {
      "id": 51,
      "name": "物联网",
      "slug": "iot",

    },
    {
      "id": 80,
      "name": "移动",
      "slug": "mobile",

    },
    {
      "id": 610,
      "name": "数字战略平台",
      "slug": "dps",

    },
    {
      "id": 614,
      "name": "商业洞见",
      "slug": "%e5%95%86%e4%b8%9a%e6%b4%9e%e8%a7%81",

    },
    {
      "id": 611,
      "name": "CE",
      "slug": "%e8%83%86%e8%af%86%e5%9e%8b%e9%a2%86%e5%af%bc%e8%80%85",

    },
    {
      "id": 613,
      "name": "EDGE",
      "slug": "%e4%bb%b7%e5%80%bc%e9%a9%b1%e5%8a%a8%e7%ae%a1%e7%90%86%ef%bc%8c%e7%b2%be%e7%9b%8a%e4%bc%81%e4%b8%9a%e7%9a%84%e6%8a%95%e8%b5%84%e7%ae%a1%e7%90%86%e6%8c%87%e5%8d%97",
    },
    {
      "id": 87,
      "name": "服务于社会领域",
      "slug": "serving-the-social-sector",

    },
    {
      "id": 615,
      "name": "组织运营变革",
      "slug": "%e7%bb%84%e7%bb%87%e8%bf%90%e8%90%a5%e5%8f%98%e9%9d%a9",

    },
    {
      "id": 1,
      "name": "未分类",
      "slug": "uncategorized",

    }
  ]

function findCategoryNameById(id) {
  function isThatCategory(element) {
    return element.id == id
  }
  return categories.find(isThatCategory).name
}

function findCategoryNameByIds(ids) {
  var result = []
  ids.forEach(
    function convert(id){
      if(id!= 1){
        result.push(findCategoryNameById(id))
      }
    }
  )
  return result
}

module.exports = {
  categories: categories,
  findCategoryNameById: findCategoryNameById,
  findCategoryNameByIds: findCategoryNameByIds
};