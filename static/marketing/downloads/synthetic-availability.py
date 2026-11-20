"""Reproduce the fictional availability example; no network or real equipment data."""
import csv
from pathlib import Path


def main() -> None:
    with Path(__file__).with_name("synthetic-availability.csv").open(newline="") as stream:
        rows = list(csv.DictReader(stream))
    scheduled = sum(int(row["scheduled_hours"]) for row in rows)
    downtime = sum(int(row["downtime_hours"]) for row in rows)
    assert all(
        0 <= int(row["downtime_hours"]) <= int(row["scheduled_hours"]) for row in rows
    )
    assert scheduled > 0
    result = 100 * (scheduled - downtime) / scheduled
    assert round(result, 6) == 88.571429
    print(f"Synthetic exposure-weighted availability: {result:.6f}%")


if __name__ == "__main__":
    main()
