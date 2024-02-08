from django.test import TestCase

# Create your tests here.
import unittest
from unittest.mock import patch, MagicMock
from io import StringIO
import sys
import time

class TestPollFunction(unittest.TestCase):

    @patch('sys.stderr', new_callable=StringIO)
    def test_infinite_loop(self, mock_stderr):
        with patch('builtins.print') as mock_print, patch('time.sleep') as mock_sleep, patch('module_name.get_automobile') as mock_get_automobile:
            poll()
            mock_print.assert_called_with('Sale poller polling for data')
            mock_get_automobile.assert_called()
            mock_sleep.assert_called_with(60)

    @patch('sys.stderr', new_callable=StringIO)
    def test_exception_handling(self, mock_stderr):
        with patch('builtins.print') as mock_print, patch('time.sleep') as mock_sleep, patch('module_name.get_automobile') as mock_get_automobile:
            mock_get_automobile.side_effect = Exception('Some error')
            poll()
            mock_print.assert_called_with('Some error', file=sys.stderr)
            mock_sleep.assert_called_with(60)

if __name__ == '__main__':
    unittest.main()
