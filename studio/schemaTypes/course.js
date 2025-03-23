export default {
    name: 'course',
    title: 'Khóa học',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Tên khóa học',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 96,
        },
        validation: Rule => Rule.required()
      },
      {
        name: 'description',
        title: 'Mô tả',
        type: 'text',
      },
      {
        name: 'imageUrl',
        title: 'Hình ảnh',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'price',
        title: 'Giá khóa học',
        type: 'string',
      },
      {
        name: 'originalPrice',
        title: 'Giá gốc',
        type: 'string',
      },
      {
        name: 'discount',
        title: 'Giảm giá (%)',
        type: 'string',
      },
    ],
  }