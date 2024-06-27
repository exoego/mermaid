// @ts-ignore: jison doesn't export types
import euler from './euler.jison';
import { db } from '../eulerDB.js';

describe('Euler diagram', function () {
  describe('when parsing an block diagram graph it should handle > ', function () {
    beforeEach(function () {
      euler.parser.yy = db;
      euler.parser.yy.clear();
      euler.parser.yy.getLogger = () => console;
    });

    it('a diagram with a node', async () => {
      const str = `euler-beta
          title foo bar
          sets   A, B,C ,D
          subset A       1
          subset B       2
          subset C       3
          subset A,D     1
          subset C, A,B  0.5
      `;
      euler.parse(str);
      expect(db.getSets()).toEqual(['A', 'B', 'C', 'D']);
      expect(db.getSubsetData()).toEqual(
        new Map([
          ['A', 1],
          ['B', 2],
          ['C', 3],
          ['A,D', 1],
          ['A,B,C', 0.5],
        ])
      );
    });
  });
});
