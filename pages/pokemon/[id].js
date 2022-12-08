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

import store from "../../src/store";

const PageContainer = styled.div`
  margin: auto;
  width: 800px;
  padding-top: 1em;
`;

export default withRouter(({ router }) => {
  const pokemon = store.pokemon.find(({ id }) => router.query.id == id);
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
