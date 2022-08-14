import Layout from '@/layout'
export default {
  path: '/import',
  component: Layout,
  hidden: true,
  children: [
    {
      path: '',
      component: () => import('@/views/import'),
    },
  ],
}
