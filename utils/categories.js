const categories = [
  {
    "id": 14,
    "name": "敏捷",
    "slug": "agile",
  },
  {
    "id": 42,
    "name": "技术雷达",
    "slug": "tech-radar",
  },
  {
    "id": 1066,
    "name": "中台",
    "slug": "zhongtai",
  },
  {
    "id": 78,
    "name": "体验设计",
    "slug": "experience-design",
  },
  {
    "id": 739,
    "name": "领域驱动设计",
    "slug": "ddd",
  },
  {
    "id": 606,
    "name": "内建安全",
    "slug": "bsi",
  },
  {
    "id": 605,
    "name": "DevOps",
    "slug": "devops",
  },
  {
    "id": 756,
    "name": "区块链",
    "slug": "blockchain",
  },
  {
    "id": 75,
    "name": "大数据",
    "slug": "bigdata",
  },
  {
    "id": 604,
    "name": "微服务",
    "slug": "microservices",
  },  
  {
    "id": 1741,
    "name": "规模化创新",
    "slug": "large-scale-innovation",
  },
  {
    "id": 610,
    "name": "数字平台战略",
    "slug": "dps",
  },
  {
    "id": 85,
    "name": "组织转型",
    "slug": "transformation",
  },
  {
    "id": 76,
    "name": "职业发展",
    "slug": "career",
  },

  {
    "id": 83,
    "name": "软件测试",
    "slug": "testing",
  }
]

function findCategoryNameById(id) {
  function isThatCategory(element) {
    return element.id == id
  }
  var category = categories.find(isThatCategory)
  if (category) {
    return category.name
  }
}

function findCategoryNameByIds(ids) {
  var result = []
  ids.forEach(
    function convert(id) {
      if (id != 1) {
        var categoryName = findCategoryNameById(id)
        if (categoryName) {
          result.push(findCategoryNameById(id))
        }
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