import { ApolloServer, gql } from 'apollo-server'

//const { ApolloServer, gql } = require('apollo-server');
const port = 3000

// The GraphQL schema
// Graphql type
const typeDefs = gql`
  input CreateBoardInput{
    writer: String
    title: String
    contents: String
  }

  type BoardReturn{
    number: Int
    writer: String
    title: String
    contents: String
  }

  type Query {
# 배열 안에 BoardReturn이 들어있어~
# fetchBoards: BoardReturn => 객체 한개가 들어있음을 의미 의미
    fetchBoards: [BoardReturn] # => '배열 '안에 객체 1개 이상을 의미 
  }

  type Mutation{
    creatBoard(writer:String, title:String, contents:String): String
    creatBoard2(CreateBoardInput: CreateBoardInput): String
  }
`;

// A map of functions which return data for the schema.
// 이런 API를 resolver라고 부른다
const resolvers = {
  Query: {
    fetchBoards:()=>{
      // 1. 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
      const result = [
        {number: 1,writer:"철수",title:"철수가썼어요",contents:"토끼짱"},
        {number: 2,writer:"영희",title:"영희가썼어요",contents:"안녕하세요"},
        {number: 3,writer:"훈이",title:"훈이가썼ㅇ요",contents:"민트초코"}
      ]
      // 2. 꺼내온 결과를 응답해주기
      return result
    }
  },


  Mutation:{
    creatBoard:( _,args )=>{
      // 1. 데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기
      console.log(args)
      // 2. 저장결과를 알려주기
      return "등록성공!"
    },

    creatBoard2:( _,args )=>{
      // 1. 데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기
      console.log(args)
      // 2. 저장결과를 알려주기
      return "등록성공!"
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(port).then(({ url }) => {
  console.log(`🚀 Server ready at ${url} on port ${port}`);
});