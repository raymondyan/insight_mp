const categories = [
  {
    "id": 14,
    "name": "敏捷实践",
    "slug": "agile-practice",
  },
  {
    "id": 85,
    "name": "组织转型",
    "slug": "organization-transformation",
  },
  {
    "id": 42,
    "name": "技术雷达",
    "slug": "tech-radar",
  },
  {
    "id": 4008,
    "name": "新兴技术",
    "slug": "emerging-technology",
  },
  {
    "id": 4009,
    "name": "组织文化",
    "slug": "organization-culture",
  },
  {
    "id": 4010,
    "name": "企业架构",
    "slug": "enterprise-architecture",
  },
  {
    "id": 4012,
    "name": "智能企业",
    "slug": "intelligent-enterprise",
  },
  {
    "id": 4014,
    "name": "金融科技",
    "slug": "fintech",
  },
  {
    "id": 4011,
    "name": "数字化转型",
    "slug": "digital-transformation",
  },
  {
    "id": 4013,
    "name": "数字化创新设计",
    "slug": "digital-innovation-design",
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