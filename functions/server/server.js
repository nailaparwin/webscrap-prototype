/* const { ApolloServer, gql } = require("apollo-server-lambda");
const faunadb = require('faunadb'),
  q = faunadb.query;


const typeDefs = gql`
type Query {
  products: [Product]!
}

type Product {
  id: ID!
  title: String!
  imgsrc: String!
  category: String!
  mcategory: String!
  price: String!
}

type Mutation {
  addProduct(title: String!, imgsrc: String!, category: String!, mcategory: String!, price: String!): Product    
}
`;


var client = new faunadb.Client({ secret: process.env.FAUNADB_ADMIN_SECRET });

const resolvers = {
  Query: {
    
    products: async (parent, args, context) => {
      try {
        
        let result = await client.query(
         
        q.Map(
          q.Paginate(q.Match(q.Index("listProducts"))),
          q.Lambda((x) => q.Get(x))
        )
        );
        console.log('this is ',result.data);
        result.data.map(d => console.log(d.ref.id))
        return result.data.map((d) => ({
          id: d.ref.id,          
          title: d.data.title,
          imgsrc: d.data.imgsrc,
          category: d.data.category,
          mcategory: d.data.mcategory,
          price: d.data.price
        }));
    } catch (err) {
      return err.toString();
    }
  }
  
  },


  Mutation: {
    addProduct: async (_, { title, imgsrc, category, mcategory, price }) => {
      try {        
        const result = await client.query(
          q.Create(q.Collection("products"), {
            data: {
              title,
              imgsrc,
              category,
              mcategory,
              price,
            },
          })
        );
        // console.log(result.data.task);
        return { ...result.data,
          id: result.ref.id}
      } catch (error) {
        return error.toString();
      }
    },   
    
  },
};
  

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true
});

exports.handler = server.createHandler();





 */