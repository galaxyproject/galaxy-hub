---
title: Use the power of pandas / numpy to transform tabular datasets in a myriad of
  ways with our new Table Compute tool
date: '2019-10-23'
tease: Drop or duplicate given rows or columns from a tabular dataset, filter rows
  or columns on their properties, replace or transform table elements, ...
tags: [tools]
authors: bgruening
authors_structured:
- github: bgruening
subsites: [eu, freiburg, global, us]
main_subsite: freiburg
---

With [Table Compute](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/table_compute/table_compute/0.9.2){:target="_top"}
you can:
- drop or duplicate given rows or columns from a tabular dataset
- filter rows or columns on their properties
- replace or transform table elements
- compute tables of summary statistics across rows or columns

It is even possible to manipulate individual tables or combine multiple ones using pandas/numpy-based custom expressions!

In short, whatever functionality for manipulating tabular data you may have missed in Galaxy is likely provided by this
tool, so give it a try in your next analysis. We are looking forward to your feedback!

Some ideas what you may use the tool for include
- transpose a tabular dataset
- log-transform the data, but add a small offset to zero-values first
- subtract a table from another
- normalize rows or columns

To get you started, here are some concrete step-by-step examples taken directly from the help section of the tool:

## Example 1: Sub-selecting from a table

We have the following table:

|   | c1 | c2| c3|
|---|----|---|---|
|g1 | 10 | 20| 30|
|g2 | 3  | 6 | 9 |
|g3 | 4  | 8 | 12|
|g4 | 81 | 6 | 3 |
{: .table}


and we want to duplicate c1 and remove c2. Also select g1 to g3 and add
g2 at the end as well. This would result in the output table:

|     | c1   | c1   | c3   |
| --- | ---- | ---- | ---- |
| g1  | 10   | 10   | 30   |
| g2  | 3    | 3    | 9    |
| g3  | 4    | 4    | 12   |
| g2  | 3    | 3    | 9    |
{: .table}

In Galaxy we would select the following:

 -   *Input Single or Multiple Tables* → **Single Table**
 -   *Column names on first row?* → **Yes**
 -   *Row names on first column?* → **Yes**
 -   *Type of table operation* → **Drop, keep or duplicate rows and
     columns**
     -   *List of columns to select* → **1,1,3**
     -   *List of rows to select* → **1:3,2**
     -   *Keep duplicate columns* → **Yes**
     -   *Keep duplicate rows* → **Yes**

## Example 2: Filter for rows with row sums less than 50

We have the following table:

|      | c1   | c2   | c3   |
| ---- | ---- | ---- | ---- |
| g1   | 10   | 20   | 30   |
| g2   | 3    | 6    | 9    |
| g3   | 4    | 8    | 12   |
| g4   | 81   | 6    | 3    |
{: .table}

and we want:

|      | c1   | c2   | c3   |
| ---- | ---- | ---- | ---- |
| g2   | 3    | 6    | 9    |
| g3   | 4    | 8    | 12   |
{: .table}

In Galaxy we would select the following:

 -   *Input Single or Multiple Tables* → **Single Table**
 -   *Column names on first row?* → **Yes**
 -   *Row names on first column?* → **Yes**
 -   *Type of table operation* → **Filter rows or columns by their
     properties**
     -   *Filter* → **Rows**
     -   *Filter Criterion* → **Result of function applied to
         columns/rows**
         -   *Keep column/row if its observed* → **Sum**
         -   *is* → **\< (Less Than)**
         -   *this value* → **50**

## Example 3: Count the number of values per row smaller than a specified value

We have the| following table:

|      | c1   | c2   | c3   |
| ---- | ---- | ---- | ---- |
| g1   | 10   | 20   | 30   |
| g2   | 3    | 6    | 9    |
| g3   | 4    | 8    | 12   |
| g4   | 81   | 6    | 3    |
{: .table}

and we want to count how many elements in each row are smaller than 10,
i.e., we want to obtain the following results table:

|      | vec   |
| ---- | ----- |
| g1   | 0     |
| g2   | 3     |
| g3   | 2     |
| g4   | 2     |
{: .table}

In Galaxy we would select the following:

 -   *Input Single or Multiple Tables* → **Single Table**
 -   *Column names on first row?* → **Yes**
 -   *Row names on first column?* → **Yes**
 -   *Type of table operation* → **Manipulate selected table elements**
     -   *Operation to perform* → **Custom**
         -   *Custom Expression on 'elem'* → **elem \< 10**
     -   *Operate on elements* → **All**

**Note:** *There are actually simpler ways to achieve our purpose, but
here we are demonstrating the use of a custom expression.*

After executing, we would then be presented with a table like so:

|      | c1     | c2      | c3      |
| ---- | ------ | ------- | ------- |
| g1   | False  | False   | False   |
| g2   | True   | True    | True    |
| g3   | True   | True    | False   |
| g4   | False  | True    | True    |
{: .table}

To get to our desired table, we would then process this table with the
tool again:

 -   *Input Single or Multiple Tables* → **Single Table**
 -   *Column names on first row?* → **Yes**
 -   *Row names on first column?* → **Yes**
 -   *Type of table operation* → **Compute Expression across Rows or
     Columns**
     -   *Calculate* → **Sum**
     -   *For each* → **Row**

Executing this will sum all the 'True' values in each row. Note that the
values must have no extra whitespace in them for this to work (e.g.
'True ' or ' True' will not be parsed correctly).

## Example 4: Perform a scaled log-transformation conditionally

We want to perform a scaled log transformation on all values greater
than 5, and set all other values to 1.

We have the following table:

|      | c1   | c2   | c3   |
| ---- | ---- | ---- | ---- |
| g1   | 0    | 20   | 30   |
| g2   | 3    | 0    | 9    |
| g3   | 4    | 8    | 0    |
| g4   | 81   | 0    | 0    |
{: .table}

and we want:

|      | c1         | c2        | c3        |
| ---- | ----       | ----      | ----      |
| g1   | 1.00000000 | 0.1497866 | 0.1133732 |
| g2   | 1.00000000 | 1.0000000 | 0.2441361 |
| g3   | 1.00000000 | 0.2599302 | 1.0000000 |
| g4   | 0.05425246 | 1.0000000 | 1.0000000 |
{: .table}

In Galaxy we would select the following:

 -   *Input Single or Multiple Tables* → **Single Table**
 -   *Column names on first row?* → **Yes**
 -   *Row names on first column?* → **Yes**
 -   *Type of table operation* → **Manipulate selected table elements**
     -   *Operation to perform* → **Custom**
         -   *Custom Expression* → :

                 (math.log(elem) / elem) if (elem > 5) else 1

         -   *Operate on elements* → **All**

## Example 5: Perform a Full table operation

We have the following table:

|    | c1   | c2   | c3   |
| -- | ---- | ---- | ---- |
| g1 | 10   | 20   | 30   |
| g2 | 3    | 10   | 9    |
| g3 | 4    | 8    | 10   |
| g4 | 81   | 10   | 10   |
{: .table}

and we want to subtract from each column the mean of that column divided
by the standard deviation of it to yield:

|    | c1        | c2        | c3        |
| -- | ----      | ----      | ----      |
| g1 | 9.351737  | 17.784353 | 28.550737 |
| g2 | 2.351737  | 7.784353  | 7.550737  |
| g3 | 3.351737  | 5.784353  | 8.550737  |
| g4 | 80.351737 | 7.784353  | 8.550737  |
{: .table}

In Galaxy we would select the following:

 -   *Input Single or Multiple Tables* → **Single Table**
 -   *Column names on first row?* → **Yes**
 -   *Row names on first column?* → **Yes**
 -   *Type of table operation* → **Perform a Full Table Operation**
     -   *Operation* → **Custom**
     -   *Custom Expression on 'table' along axis (0 or 1)* → :

             table - table.mean(0)/table.std(0)

## Example 6: Perform operations on multiple tables

We have the following three input tables:

Table 1

|      | c1   | c2   | c3   |
| ---- | ---- | ---- | ---- |
| g1   | 10   | 20   | 30   |
| g2   | 3    | 10   | 9    |
| g3   | 4    | 8    | 10   |
{: .table}

Table 2

|    | c1   | c2   |
| -- | ---- | ---- |
| g1 | 1    | 2    |
| g2 | 3    | 4    |
| g3 | 6    | 5    |
{: .table}

Table 3

|    | c1   | c2   | c3   |
| -- | ---- | ---- | ---- |
| g1 | 1    | 2    | 3    |
| g2 | 1    | 2    | 3    |
{: .table}

*Note that the dimensions of these tables do not match.*

Dimensions:
:   -   Table1 [3,3]
    -   Table2 [3,2]
    -   Table3 [2,3]

In order to perform simple operations between Tables, they must be of
the same dimensions.

To add Table2 to Table3 we would have to transpose one of the tables
using the in-built T method:

    table2 + table3.T

or:

    table2.T + table3

We can also perform more general operations using all 3 tables, such as
taking the minimum value of the maximum values of Table2 and Table3, and
dividing the Table1 values by it:

    table1 / min(table2.values.max(), table3.values.max())

To perform these types of operations in Galaxy we would select the
following:

-   *Input Single or Multiple Tables* → **Multiple Tables**
-   *(For each inserted table)*
    :   -   *Column names on first row?* → **Yes**
        -   *Row names on first column?* → **Yes**

-   *Custom Expression* → :

        <insert your desired function>

Please note that the last example shown above was chosen to illustrate
the limitations of the tool. Nested attributes like table2.values.max
are disallowed in expressions in the tool so the above would have to be
replaced with the harder to read workaround:

    table1 / min(np.max(np.max(table2)), np.max(np.max(table3)))

Also note that, currently min(), max() and sum() are the only built-in
Python functions that can be used inside expressions. If you want to use
additional functions, these have to be qualified functions from the
math, np or pd libraries.

## Example 7: Melt

We have the following table

|    | A   | B   | C   |
| -- | --- | --- | --- |
| 0  | a   | B   | 1   |
| 1  | b   | B   | 3   |
| 2  | c   | B   | 5   |
{: .table}

and we want:

|    | A   | variable   | value   |
| -- | --- | ---------- | ------- |
| 0  | a   | B          | B       |
| 1  | b   | B          | B       |
| 2  | c   | B          | B       |
| 3  | a   | C          | 1       |
| 4  | b   | C          | 3       |
| 5  | c   | C          | 5       |
{: .table}

In Galaxy we would select the following:

-   *Input Single or Multiple Tables* → **Single Table**
-   *Column names on first row?* → **Yes**
-   *Row names on first column?* → **Yes**
-   *Type of table operation* → **Perform a Full Table Operation**
    -   *Operation* → **Melt**
    -   *Variable IDs* → "A"
    -   *Unpivoted IDs* → "B,C"

This converts the "B" and "C" columns into variables.

## Example 8: Pivot

We have the following table

|    | foo   | bar   | baz   | zoo   |
| -- | ----- | ----- | ----- | ----- |
| 0  | one   | A     | 1     | x     |
| 1  | one   | B     | 2     | y     |
| 2  | one   | C     | 3     | z     |
| 3  | two   | A     | 4     | q     |
| 4  | two   | B     | 5     | w     |
| 5  | two   | C     | 6     | t     |
{: .table}
