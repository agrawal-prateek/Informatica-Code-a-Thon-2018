/**
 * @author Prateek Agrawal
 */

import java.util.*;
import java.io.*;

public class CandidateCode {
	public static void main(String args[] ) throws Exception {

        int total = 0;
        Scanner in = new Scanner(System.in);
        int m = in.nextInt(), n = in.nextInt(), p = in.nextInt(), q = in.nextInt();
		if (n >= m && q >= p && m > 0 && n > 0 && p > 0 && q > 0) {
			for (int rowno = m; rowno <= n; rowno++) {
				for (int column = p; column <= q; column++) {
					int remainingRow = rowno, remainingColumn = column;
					while (true) {
						if (remainingRow == 0 && remainingColumn == 0) {
							break;
						}
						if (remainingRow > remainingColumn) {
							remainingRow = remainingRow - remainingColumn;
							total = total + 1;
						}
						if (remainingRow < remainingColumn) {
							remainingColumn = remainingColumn - remainingRow;
							total = total + 1;
						}
						if (remainingRow == remainingColumn) {
							remainingRow = 0;
							remainingColumn = 0;
							total = total + 1;
						}
					}
				}
			}
        }
        System.out.println(total);
	}
}
