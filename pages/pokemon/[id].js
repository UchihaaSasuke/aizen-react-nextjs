import {
  CssBaseline,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from "@material-ui/core";
import styled from "@emotion/styled";
import { withRouter } from "next/router";
import Link from "next/link";

const PageContainer = styled.div`
  margin: auto;
  width: 800px;
  padding-top: 1em;
`;

export async function getStaticPaths() {
  const allPokemon = require("../../src/pokemon.json");
  return {
    paths: allPokemon.map((p) => ({
      params: {
        id: p.id.toString(),
      },
    })),
    fallback: false, // can also be true or 'blocking'
  };
}

export async function getStaticProps(context) {
  const allPokemon = require("../../src/pokemon.json");
  const pokemon = allPokemon.find(({ id }) => context.params.id == id);
  return {
    props: {
      pokemon,
    }, // will be passed to the page component as props
  };
}

export default withRouter(({ pokemon }) => {
  return (
    <PageContainer>
      <CssBaseline />
      {pokemon && (
        <div>
          <Link href={`/`}>
            <a>Go back</a>
          </Link>
          <h1>{pokemon.name.english}</h1>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Attribute</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(pokemon.base).map((k) => (
                <TableRow key={k}>
                  <TableCell>{k}</TableCell>
                  <TableCell>{pokemon.base[k]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </PageContainer>
  );
});
