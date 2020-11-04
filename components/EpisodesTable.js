// @flow
import React from 'react';

const getSeason = (str: string) => {
  const [, season] = /S(\d+)/.exec(str) || [];
  return season || 'unknown';
};

const getEpisodeNumber = (str: string) => {
  const [, number] = /E(\d+)/.exec(str) || [];
  return number || 'unknown';
};

type Props = {|
  +episodes: Array<Episode>
|};

export default function EpisodesTable({ episodes }: Props) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Episode mame</th>
            <th>Air date</th>
            <th>Season</th>
            <th>Episode</th>
          </tr>
        </thead>
        <tbody>
          {episodes.map((e) => (
            <tr key={e.episode}>
              <td>{e.name}</td>
              <td>{e.air_date}</td>
              <td>{getSeason(e.episode)}</td>
              <td>{getEpisodeNumber(e.episode)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx>
        {`
          table {
            width: 100%;
            border-collapse: collapse;
          }

          /* Zebra striping */
          tr:nth-of-type(odd) {
            background: #eee;
          }

          th {
            background: #333;
            color: white;
            font-weight: bold;
          }

          td, th {
            padding: 6px;
            border: 1px solid #ccc;
            text-align: left;
          }

          @media (max-width: 970px) {
            td:nth-of-type(3), td:nth-of-type(4), th:nth-of-type(3), th:nth-of-type(4) {
              display: none;
            }
          }

          @media (max-width: 836px) {
            table, thead, tbody, th, td, tr {
              display: block;
            }

            thead tr {
              display: none;
            }

            tr {
              border: 1px solid #ccc;
            }

            td {
              /* Behave  like a "row" */
              border: none;
              border-bottom: 1px solid #eee;
              position: relative;
              padding-left: 50%;
            }

            td:before {
              /* Now like a table header */
              position: absolute;
              /* Top/left values mimic padding */
              top: 6px;
              left: 6px;
              width: 45%;
              padding-right: 10px;
              white-space: nowrap;
            }

            td:nth-of-type(1):before {
              content: "Episode mame";
            }

            td:nth-of-type(2):before {
              content: "Air date";
            }
          }
      `}
      </style>
    </div>
  );
}
