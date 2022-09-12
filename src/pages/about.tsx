function Blog({ posts }:{posts:any}) {
  return (
    <div>about</div>
    // <ul>
    //   {posts.map((post:any) => (
    //     <li key={post.name}>{post.name}  <p className="mt-[0.3px] text-dark-900 pt-5px">66666666</p></li>
        
    //   ))}
    // </ul>
  );
}
// 此函数在构建时被调用
// export async function getStaticProps() {
//   // 调用外部 API 获取博文列表
//   const res = await fetch(
//     'http:localhost:3000/api/hello'
//   );
  
//   const data = await res.json();
//   // 通过返回 { props: { posts } } 对象，Blog 组件
//   // 在构建时将接收到 `posts` 参数
//   return {
//     props: {
//       posts: [data],
//     },
//   };
// }
export default Blog;
