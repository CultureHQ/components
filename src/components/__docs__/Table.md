---
prependJs:
- import Panel from "../Panel";
- import Table from "../Table";
---

## `<Table>`

Displays a table.

* `children` - displayed inside the table
* `className?` - an extra class name

{{
  <Panel>
    <Panel.Body>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Chapters</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>The Sorcerer&#39;s Stone</td>
            <td>17</td>
          </tr>
          <tr>
            <td>2</td>
            <td>The Chamber of Secrets</td>
            <td>18</td>
          </tr>
          <tr>
            <td>3</td>
            <td>The Prisoner of Azkaban</td>
            <td>22</td>
          </tr>
          <tr>
            <td>4</td>
            <td>The Goblet of Fire</td>
            <td>37</td>
          </tr>
          <tr>
            <td>5</td>
            <td>The Order of the Phoenix</td>
            <td>38</td>
          </tr>
          <tr>
            <td>6</td>
            <td>The Half-Blood Prince</td>
            <td>30</td>
          </tr>
          <tr>
            <td>7</td>
            <td>The Deathly Hallows</td>
            <td>37</td>
          </tr>
        </tbody>
      </Table>
    </Panel.Body>
  </Panel>
}}
